package dao

import (
	_ "github.com/go-sql-driver/mysql"
	"hackathon/model"
	"log"
)

func GetUsers() ([]model.User, error) {
	rows, ServerErr := db.Query("SELECT user_id, first_name, last_name FROM users")
	if ServerErr != nil {
		log.Printf("fail: db.Query, %v\n", ServerErr)
		return nil, nil
	}
	users := make([]model.User, 0)
	for rows.Next() {
		var u model.User
		if err := rows.Scan(&u.UserId, &u.FirstName, &u.LastName); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil {
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			return nil, nil
		}
		users = append(users, u)
	}
	return users, ServerErr
}

func RegisterUser(user model.User) error {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return nil
	}
	_, err = db.Query("INSERT INTO users(user_id, first_name, last_name) VALUES (?, ?, ?)", user.UserId, user.FirstName, user.LastName)
	if err != nil {
		tx.Rollback()
		log.Printf("fail: db.Query, %v\n", err)
		return nil
	} else {
		tx.Commit()
	}
	return err
}
