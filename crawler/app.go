package main

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"
)

type GithubResponseList struct {
	Items []GithubResponseItem `json:"items"`
}

type GithubResponseItem struct {
	//Id        int    `json:"id"`
	Name string `json:"name"`
	//Full_name string `json:"full_name"`
	Url string `json:"url"`
}

type Link struct {
	Next bool
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

func getLink(headerArray http.Header) (Link, error) {
	var newLink Link

	if len(headerArray) != 0 {
		links := strings.Split(headerArray["Link"][0], ",")
		rel := strings.Split(links[0], ";")[1]
		rel = strings.Split(rel, "=")[1]
		rel = strings.TrimPrefix(rel, `"`)
		rel = strings.TrimSuffix(rel, `"`)

		nextlink := ""

		if rel == "next" {
			nextlink = strings.Split(links[0], ";")[0]
			nextlink = strings.TrimPrefix(nextlink, "<")
			nextlink = strings.TrimSuffix(nextlink, ">")

			newLink.Next = true
			newLink.Url = nextlink

		}

		return newLink, nil
	}

	err := errors.New("Invalid header")

	return newLink, err
}

func main() {

	var response GithubResponseList
	var finalResponse GithubResponseList
	body, header, err := httpCaller("https://api.github.com/search/repositories?q=docker-compose&sort=stars&order=desc")

	if err != nil {
		log.Println(err)
	}

	err = json.Unmarshal(body, &response)
	if err != nil {
		log.Println(err)
	}

	link, _ := getLink(header)

	finalResponse = response

Loop:
	for {
		currentURL := link.Url
		if link.Next == true {
			var nextResponse GithubResponseList
			body, header, err := httpCaller(currentURL)

			if err != nil {
				log.Println(err)
			}

			link, err = getLink(header)

			if err == nil {

				log.Println(link.Url)

				err = json.Unmarshal(body, &nextResponse)
				if err != nil {
					log.Println(err)
				}

				log.Println(finalResponse)

				finalResponse.Items = append(finalResponse.Items, nextResponse.Items...)
				response = nextResponse

			} else {
				link.Url = currentURL
				link.Next = true
			}

			time.Sleep(10 * time.Second)

		} else {
			break Loop
		}
	}
}
