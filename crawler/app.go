package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/ghodss/yaml"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

var (
	GITHUB_CLIENT_SECRET = os.Getenv("GITHUB_CLIENT_SECRET")
	GITHUB_CLIENT_ID     = os.Getenv("GITHUB_CLIENT_ID")
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

type StackfileDBEntry struct {
	Id          bson.ObjectId `bson:"_id"`
	Title       string        `bson:"title"`
	Branch      string        `bson:"branch"`
	Path        string        `bson:"path"`
	User        string        `bson:"user"`
	Author      string        `bson:"author"`
	Description string        `bson:"description"`
	Token       []string      `bson:"token"`
	ProfileLink string        `bson:"profileLink"`
	ProjectName string        `bson:"projectName"`
	Tags        []string      `bson:"tags"`
	Images      []string      `bson:"images"`
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
		if res.StatusCode == 403 {
			time.Sleep(60 * time.Second)
		}
		err = errors.New("Unexpected Status Code " + strconv.Itoa(res.StatusCode))
		return nil, nil, err
	}

	return body, res.Header, nil
}

func checkRemainingRequest(header http.Header) int {

	/*
		Checking the remaining requests to avoid API throttling
	*/
	if len(header) != 0 {
		remaining := header["X-Ratelimit-Remaining"][0]
		if remaining == "0" {

			/*
				If limit is reached, we check the reset time
				(which is divided because it's too long) and return it
			*/
			resetTime, _ := strconv.Atoi(header["X-Ratelimit-Reset"][0])
			return resetTime / 10000000
		}
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
	body, header, err := httpCaller("https://api.github.com/search/repositories?q=" + term + "&sort=stars&order=desc&client_id=" + GITHUB_CLIENT_ID + "&client_secret=" + GITHUB_CLIENT_SECRET)

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
	fmt.Println("Loading Data...") //This should be replaced by a progress bar

Loop:
	for {
		currentURL := link.Url

		if link.Next == true {
			var nextResponse GithubResponseList
			body, header, err := httpCaller(currentURL + "&client_id=" + GITHUB_CLIENT_ID + "&client_secret=" + GITHUB_CLIENT_SECRET)

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

func YamlToJson(yamlFile []byte) ([]byte, error) {
	json, err := yaml.YAMLToJSON(yamlFile)
	if err != nil {
		return nil, err
	}
	return json, nil
}

func Tokeniser(name string) []string {
	array := strings.Split(name, "")
	newArray := []string{}
	newArray = append(newArray, array[0])

	for i := 1; i < len(array); i++ {
		newArray = append(newArray, newArray[i-1]+array[i])
	}

	return newArray
}

func Taging(jsonFile []byte) ([]string, []string) {
	keys := make(map[string]interface{})

	err := json.Unmarshal(jsonFile, &keys)
	if err != nil {
		log.Println(err)
	}

	tags := make([]string, len(keys))
	imageList := make([]interface{}, len(keys))

	i := 0
	for s, _ := range keys {
		tags[i] = s
		image := keys[tags[i]].(map[string]interface{})
		imageList[i] = image["image"]
		i++
	}

	images := []string{}
	for _, v := range imageList {
		if v != nil {
			images = append(images, v.(string))
		}
	}

	return tags, images
}

func checkRepository(link string, c chan StackfileDBEntry) {
	var dbEntry StackfileDBEntry

	var response GithubRepoDetails
	var fileList []GithubRepoFile

	body, header, err := httpCaller(link + "?client_id=" + GITHUB_CLIENT_ID + "&client_secret=" + GITHUB_CLIENT_SECRET)
	resetTime := checkRemainingRequest(header)

	if resetTime != 0 {
		log.Printf("Waiting %d seconds", resetTime)
		time.Sleep(time.Duration(resetTime) * time.Second)
	}

	if err != nil {
		log.Println(err)
	}

	err = json.Unmarshal(body, &response)
	if err != nil {
		log.Println(err)
	}

	if response.Private != true {
		content, header, err := httpCaller(strings.TrimSuffix(response.Contents_url, "{+path}") + "?client_id=" + GITHUB_CLIENT_ID + "&client_secret=" + GITHUB_CLIENT_SECRET)

		resetTime := checkRemainingRequest(header)

		if resetTime != 0 {
			log.Printf("Waiting %d seconds", resetTime)
			time.Sleep(time.Duration(resetTime) * time.Second)
		}

		if err != nil {
			log.Println(err)
		}

		err = json.Unmarshal(content, &fileList)
		if err != nil {
			log.Println(err)
		}

		for _, file := range fileList {
			if file.Name == "docker-compose.yml" || file.Name == "tutum.yml" {
				dbEntry.Author = response.Owner.Login
				dbEntry.Branch = response.Default_branch
				dbEntry.Description = response.Description + " " + response.Homepage
				dbEntry.Path = "/"
				dbEntry.ProfileLink = response.Owner.HTML_url
				dbEntry.ProjectName = response.Name
				dbEntry.Title = response.Name
				dbEntry.User = response.Owner.Login
				dbEntry.Token = Tokeniser(response.Name)

				body, _, err := httpCaller(file.Download_url)
				if err != nil {
					log.Println(err)
				}

				json, err := YamlToJson(body)
				if err != nil {
					log.Println(err)
				}

				tags, images := Taging(json)

				dbEntry.Tags = tags
				dbEntry.Images = images
				c <- dbEntry
			}
		}
	}
}

func fillDB() {
	c := make(chan StackfileDBEntry)

	session, err := getMongoSession()
	defer session.Close()
	session.SetSafe(&mgo.Safe{})

	if err != nil {
		log.Println(err)
	}

	collection := session.DB("admin").C("files")

	fmt.Println("==> Searching Github for docker-compose repositories")
	results := githubSearch("docker-compose")
	fmt.Println("==> Checking presence of docker-compose.yml in search results")
	for _, repositories := range results.Items {
		go checkRepository(repositories.Url, c)
	}

	for {
		file := <-c

		doc := StackfileDBEntry{Id: bson.NewObjectId(), Author: file.Author, Tags: file.Tags, Images: file.Images, Branch: file.Branch, Description: file.Description, User: file.User, Path: file.Path, ProfileLink: file.ProfileLink, ProjectName: file.ProjectName, Title: file.Title, Token: file.Token}
		err = collection.Insert(doc)
		if err != nil {
			fmt.Printf("Can't insert document: %v\n", err)
			os.Exit(1)
		}
	}

}

func mongoConnectTest() (s bool) {

	session, err := mgo.Dial("mongodb://admin:test@192.168.59.100:27018")
	if err == nil {
		defer session.Close()
		s = true
	} else {
		s = false
	}
	return s
}

func getMongoSession() (*mgo.Session, error) {
	session, err := mgo.Dial("mongodb://admin:test@192.168.59.100:27018")
	if err != nil {
		return nil, err
	}
	return session, nil
}

func main() {
	fmt.Println("Starting crawler process")
	fmt.Println("==> Testing MongoDB connection")
	testDB := mongoConnectTest()
	if testDB != false {
		fmt.Println("==> MongoDB test successfull!")
		fmt.Println("==> Starting crawling process")
		fmt.Println("==> -------------------------")
		fillDB()
	} else {
		fmt.Println("==> MongoDB database not available")
	}
	fmt.Println("Exiting crawler process")
}
