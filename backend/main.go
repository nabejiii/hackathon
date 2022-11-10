package main

import (
	"hackathon/controller"
	"hackathon/dao"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/login", controller.LoginHandler)
	http.HandleFunc("/user", controller.ContributionHandler)

	dao.CloseDBWithSysCall()

	log.Println("Listening...")
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal(err)
	}
}
