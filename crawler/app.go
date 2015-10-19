package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type GithubResponseList struct {
	Items []GithubResponseItem `json:"items"`
}

type GithubResponseItem struct {
	//Id        int    `json:"id"`
	//Name      string `json:"name"`
	//Full_name string `json:"full_name"`
	Url string `json:"url"`
}

type GithubOwner struct {
	Login    string `json:"login"`
	HTML_url string `json:"html_url"`
}

type GithubRepoDetails struct {
	Name           string      `json:"name"`
	Owner          GithubOwner `json:"owner"`
	Private        bool        `json:"private"`
	HTML_url       string      `json:"html_url"`
	Description    string      `json:"description"`
	Contents_url   string      `json:"contents_url"`
	Homepage       string      `json:"homepage"`
	Default_branch string      `json:"default_branch"`
}

type GithubRepoFilesList struct {
	Items []GithubRepoFile
}

type GithubRepoFile struct {
	Name         string `json:"name"`
	Path         string `json:"path"`
	Download_url string `json:"download_url"`
}

type Link struct {
	Next bool
	Last string
	Url  string
}

/*
	Classic http caller function that returns the body and the header of a request
	if successful
*/
func httpCaller(request string) ([]byte, http.Header, error) {
	res, err := http.Get(request)

	if err != nil {
		return nil, nil, err
	}

	body, err := ioutil.ReadAll(res.Body)
	res.Body.Close()

	if err != nil {
		return nil, nil, err
	}

	if res.StatusCode > 300 {
		log.Fatal("Unexpected Status Code ", res)
	}

	return body, res.Header, nil
}

func checkRemainingRequest(header http.Header) int {

	/*
		Checking the remaining requests to avoid API throttling
	*/

	remaining := header["X-Ratelimit-Remaining"][0]
	if remaining == "0" {

		/*
			If limit is reached, we check the reset time
			(which is divided because it's too long) and return it
		*/
		resetTime, _ := strconv.Atoi(header["X-Ratelimit-Reset"][0])
		return resetTime / 10000000
	}
	return 0
}

func getLinkDetails(headerArray http.Header) (Link, error) {
	var newLink Link

	if len(headerArray) != 0 {

		/*
			The first element of the Link section of the header contains
			the "next" page link if present
		*/
		links := strings.Split(headerArray["Link"][0], ",")

		rel := strings.Split(links[0], ";")[1]
		rel = strings.Split(rel, "=")[1]
		rel = strings.TrimPrefix(rel, `"`)
		rel = strings.TrimSuffix(rel, `"`)

		nextlink := ""
		lastlink := ""

		if rel == "next" {
			/*
				Removing "<" and ">" characters from the links
			*/
			nextlink = strings.Split(links[0], ";")[0]
			nextlink = strings.TrimPrefix(nextlink, "<")
			nextlink = strings.TrimSuffix(nextlink, ">")

			lastlink = strings.Split(links[1], ";")[0]
			lastlink = strings.TrimPrefix(lastlink, " <")
			lastlink = strings.TrimSuffix(lastlink, ">")

			newLink.Next = true
			newLink.Url = nextlink
			newLink.Last = lastlink

		}

		return newLink, nil
	}

	err := errors.New("Invalid header")

	return newLink, err
}

func githubSearch(term string) GithubResponseList {

	//Current response
	var response GithubResponseList
	//Final response that will be returned by the function
	var finalResponse GithubResponseList

	/*
		First data fetching round
	*/
	body, header, err := httpCaller("https://api.github.com/search/repositories?q=" + term + "&sort=stars&order=desc")

	if err != nil {
		log.Println(err)
	}

	err = json.Unmarshal(body, &response)
	if err != nil {
		log.Println(err)
	}

	link, _ := getLinkDetails(header)

	finalResponse = response

	/*
		Loop through pagination
	*/
Loop:
	for {
		log.Println("Loading Data...") //This should be replaced by a progress bar
		currentURL := link.Url

		if link.Next == true {
			var nextResponse GithubResponseList
			body, header, err := httpCaller(currentURL)

			if err != nil {
				log.Println(err)
			}

			/*
				Managing Github's API throttling by getting the remaining number of requests allowed
				and the limit reset time. As the reset time is really long (about 16 days) we'll
				divide it during development.
			*/
			resetTime := checkRemainingRequest(header)

			if resetTime != 0 {
				log.Printf("Waiting %d seconds", resetTime)
				time.Sleep(time.Duration(resetTime) * time.Second)
			}

			link, err = getLinkDetails(header)

			if err == nil {
				err = json.Unmarshal(body, &nextResponse)
				if err != nil {
					log.Println(err)
				}

				/*
					Appending the newly feteched JSON to the existing response.
				*/
				finalResponse.Items = append(finalResponse.Items, nextResponse.Items...)

			} else {
				/*
					If there is an error while getting the link details, we reset
					the values of the link object so we try to fetch those data again.
				*/
				link.Url = currentURL
				link.Next = true
			}

			/*
				Extra sleep time to avoid throttling.
			*/
			time.Sleep(5 * time.Second)

			/*
				If last page is reached we stop the loop
			*/
			if currentURL == link.Last {
				break Loop
			}

		} else {
			break Loop
		}
	}

	return finalResponse
}

func main() {

	var response GithubRepoDetails

	body, _, err := httpCaller("https://api.github.com/repos/shipyard/shipyard")

	if err != nil {
		log.Println(err)
	}

	err = json.Unmarshal(body, &response)
	if err != nil {
		log.Println(err)
	}

	content, _, err := httpCaller(strings.TrimSuffix(response.Contents_url, "{+path}"))
	if err != nil {
		log.Println(err)
	}

	log.Println(string(content))

}
