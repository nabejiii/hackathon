package dao

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"hackathon/model"
	"log"
	"net/http"
)

func GetUsers(w http.ResponseWriter) *sql.Rows {
	rows, err := db.Query("SELECT user_id, first_name, last_name FROM users")
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return nil
	}
	return rows
}

func RegisterUser(user model.User, w http.ResponseWriter) {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	_, err = db.Query("INSERT INTO users(user_id, first_name, last_name) VALUES (?, ?, ?)", user.UserId, user.FirstName, user.LastName)
	if err != nil {
		tx.Rollback()
		log.Printf("fail: db.Query, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	} else {
		tx.Commit()
	}
}
