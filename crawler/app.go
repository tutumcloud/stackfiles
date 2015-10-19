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

type Link struct {
	Next bool
	Last string
	Url  string
}

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
		log.Println("Unexpected Status Code ", res.StatusCode)
		log.Fatal("Unexpected Status Code ", res)
	}

	return body, res.Header, nil
}

func checkRemainingRequest(header http.Header) int {
	remaining := header["X-Ratelimit-Remaining"][0]
	if remaining == "0" {
		resetTime, _ := strconv.Atoi(header["X-Ratelimit-Reset"][0])
		return resetTime / 10000000
	}
	return 0
}

func getLinkDetails(headerArray http.Header) (Link, error) {
	var newLink Link

	if len(headerArray) != 0 {
		links := strings.Split(headerArray["Link"][0], ",")
		rel := strings.Split(links[0], ";")[1]
		rel = strings.Split(rel, "=")[1]
		rel = strings.TrimPrefix(rel, `"`)
		rel = strings.TrimSuffix(rel, `"`)

		nextlink := ""
		lastlink := ""

		if rel == "next" {
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

func GithubSearch(term string) GithubResponseList {
	var response GithubResponseList
	var finalResponse GithubResponseList
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

Loop:
	for {
		log.Println("Loading Data...")
		currentURL := link.Url

		if link.Next == true {
			var nextResponse GithubResponseList
			body, header, err := httpCaller(currentURL)

			if err != nil {
				log.Println(err)
			}

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

				finalResponse.Items = append(finalResponse.Items, nextResponse.Items...)
				response = nextResponse

			} else {
				link.Url = currentURL
				link.Next = true
			}

			time.Sleep(5 * time.Second)

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
	results := GithubSearch("docker-compose")
	log.Println(results)
}
