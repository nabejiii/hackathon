package usecase

import (
	"hackathon/dao"
	"hackathon/model"
	"time"
)

func GetRecCons(UserId string) (int, int, []model.Con, error) {
	day := time.Now().AddDate(0, 0, -7)
	weekPoint, totalPoint, ServerErr := dao.GetPointSum(UserId, day)
	if ServerErr != nil {
		return -1, -1, nil, ServerErr
	}
	ReceivedCons, ServerErr := dao.GetReceivedCons(UserId)
	if ServerErr != nil {
		return -1, -1, nil, ServerErr
	}
	return weekPoint, totalPoint, ReceivedCons, ServerErr
}

func GetSentCons(UserId string) ([]model.Con, error) {
	SentCons, ServerErr := dao.GetSentCons(UserId)
	if ServerErr != nil {
		return nil, ServerErr
	}
	return SentCons, ServerErr
}
