package usecase

import (
	"hackathon/dao"
	"hackathon/model"
)

func GetRecCons(UserId string) (int, []model.Con, error) {
	point, ServerErr := dao.GetPointSum(UserId)
	if ServerErr != nil {
		return -1, nil, ServerErr
	}

	ReceivedCons, ServerErr := dao.GetReceivedCons(UserId)
	if ServerErr != nil {
		return -1, nil, ServerErr
	}

	return point, ReceivedCons, ServerErr
}

func GetSentCons(UserId string) ([]model.Con, error) {
	SentCons, ServerErr := dao.GetSentCons(UserId)
	if ServerErr != nil {
		return nil, ServerErr
	}
	return SentCons, ServerErr
}
