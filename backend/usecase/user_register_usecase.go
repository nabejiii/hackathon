package usecase

import (
	"encoding/json"
	"github.com/oklog/ulid/v2"
	"hackathon/dao"
	"hackathon/model"
	"log"
	"net/http"
	"unicode/utf8"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	var user model.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if user.LastName == "" || utf8.RuneCountInString(user.LastName) > 50 {
		log.Println("fail: lastname is invalid")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if user.FirstName == "" || utf8.RuneCountInString(user.FirstName) > 50 {
		log.Println("fail: firstname is invalid")
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	user.UserId = ulid.Make().String()
	dao.RegisterUser(user, w)
}
