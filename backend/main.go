package main

import (
	"hackathon/controller"
	"hackathon/dao"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/login", controller.LoginHandler)
	http.HandleFunc("/signup", controller.SignUpHandler)
	http.HandleFunc("/home", controller.RecConHandler)
	http.HandleFunc("/user", controller.UserInfoHandler)
	http.HandleFunc("/send", controller.SendConHandler)
	http.HandleFunc("/members", controller.MembersHandler)
	dao.CloseDBWithSysCall()

	log.Println("Listening...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
