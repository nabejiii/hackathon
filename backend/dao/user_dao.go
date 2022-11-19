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
		return nil, ServerErr
	}
	users := make([]model.User, 0)
	for rows.Next() {
		var u model.User
		if err := rows.Scan(&u.UserId, &u.FirstName, &u.LastName); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil {
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			return nil, err
		}
		users = append(users, u)
	}
	return users, ServerErr
}

func RegisterUser(user model.User) error {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return err
	}
	_, err = db.Query("INSERT INTO users(user_id, first_name, last_name) VALUES (?, ?, ?)", user.UserId, user.FirstName, user.LastName)
	if err != nil {
		tx.Rollback()
		log.Printf("fail: db.Query, %v\n", err)
		return err
	} else {
		tx.Commit()
	}
	return err
}

func UpdateUser(user model.User) error {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return err
	}
	_, err = db.Query("UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?", user.FirstName, user.LastName, user.UserId)
	if err != nil {
		tx.Rollback()
		log.Printf("fail: db.Query, %v\n", err)
		return err
	} else {
		tx.Commit()
	}
	return err
}

func GetUserInfo(UserId string) (model.User, error) {
	var user model.User
	user.UserId = UserId
	err := db.QueryRow("SELECT first_name, last_name FROM users WHERE user_id = ?", UserId).Scan(&user.FirstName, &user.LastName)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return model.User{}, nil
	}
	return user, err
}
