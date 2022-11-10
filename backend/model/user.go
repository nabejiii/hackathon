package model

type User struct {
	UserId    string `json:"user_id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}
