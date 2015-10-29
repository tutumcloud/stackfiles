package main // import "github.com/tutumcloud/stackfiles/migration"
import (
	"log"
	"os"

	"./migrations"
	"gopkg.in/mgo.v2"
)

func migrate(session *mgo.Session) {
	collection := session.DB("admin").C("files")
	migrations.TypeMigration(collection)
}

func getMongoSession() (*mgo.Session, error) {
	session, err := mgo.Dial("mongodb://admin:" + os.Getenv("MONGODB_PASS") + "@" + os.Getenv("MONGODB_PORT_27017_TCP_ADDR") + ":" + os.Getenv("MONGODB_PORT_27017_TCP_PORT"))
	if err != nil {
		return nil, err
	}
	return session, nil
}

func main() {
	session, err := getMongoSession()

	if err != nil {
		log.Println(err)
		return
	}
	migrate(session)
}
