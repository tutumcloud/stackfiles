package migrations

import (
	"log"
	"net/http"

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
	existingEntries, err := readDB(collection)

	if err != nil {
		log.Println(err)
	}

	for _, file := range existingEntries {
		log.Println(file.Type)
	}
	/*body, _, err := httpCaller("https://github.com/" + dbEntry.Author + "/" + dbEntry.Title + "/raw/master/docker-compose.yml")
	if err != nil {
		log.Println("https://github.com/" + dbEntry.Author + "/" + dbEntry.Title + "/raw/master/docker-compose.yml")
		log.Println(err)
	}*/
}
