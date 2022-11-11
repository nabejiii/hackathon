package usecase

import (
	"hackathon/dao"
	"hackathon/model"
)

func GetUsers() ([]model.User, error) {
	users, ServerErr := dao.GetUsers()
	return users, ServerErr
}
