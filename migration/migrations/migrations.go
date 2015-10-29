package migrations

import (
	"fmt"
	"log"
	"net/http"
	"sync"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type StackfileDBEntry struct {
	Id          bson.ObjectId `bson:"_id"`
	Title       string        `bson:"title"`
	Branch      string        `bson:"branch"`
	Path        string        `bson:"path"`
	User        string        `bson:"user"`
	Author      string        `bson:"author"`
	Description string        `bson:"description"`
	Token       []string      `bson:"type"`
	Type        string        `bson:"token"`
	ProfileLink string        `bson:"profileLink"`
	ProjectName string        `bson:"projectName"`
	Tags        []string      `bson:"tags"`
	Images      []string      `bson:"images"`
}

func httpCaller(request string) (*http.Response, error) {
	res, err := http.Get(request)

	if err != nil {
		return nil, err
	}

	return res, nil
}

func readDB(collection *mgo.Collection) ([]StackfileDBEntry, error) {
	var results []StackfileDBEntry
	err := collection.Find(nil).All(&results)
	if err != nil {
		return nil, err
	}

	return results, nil
}

func TypeMigration(collection *mgo.Collection) {

	var wg sync.WaitGroup

	fmt.Println("Reading existing entries")
	existingEntries, err := readDB(collection)

	if err != nil {
		log.Println(err)
	}

	wg.Add(len(existingEntries))

	for _, file := range existingEntries {
		go func(file StackfileDBEntry) {
			defer wg.Done()
			if file.Type == "" {
				res, _ := httpCaller("https://github.com/" + file.Author + "/" + file.ProjectName + "/raw/master/tutum.yml")
				if res.StatusCode == 404 {
					collection.UpdateId(file.Id, bson.M{"$set": bson.M{"type": "docker-compose"}})
				} else {
					collection.UpdateId(file.Id, bson.M{"$set": bson.M{"type": "tutum"}})
				}
			}
		}(file)
	}
	wg.Wait()
	fmt.Println("Processed all entries")
}
