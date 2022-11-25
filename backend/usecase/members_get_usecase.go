package usecase

import (
	"hackathon/dao"
	"hackathon/model"
	"time"
)

func GetMembers() ([]model.Member, error) {
	day := time.Now().AddDate(0, 0, -7)
	members, ServerErr := dao.GetMembers(day)
	return members, ServerErr
}
