package usecase

import (
	"hackathon/dao"
	"hackathon/model"
)

func GetMembers() ([]model.Member, error) {
	members, ServerErr := dao.GetMembers()
	return members, ServerErr
}
