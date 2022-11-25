package model

type User struct {
	UserId    string `json:"user_id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

type Member struct {
	UserId     string `json:"user_id"`
	FirstName  string `json:"first_name"`
	LastName   string `json:"last_name"`
	WeekPoint  int    `json:"week_point"`
	TotalPoint int    `json:"total_point"`
}
