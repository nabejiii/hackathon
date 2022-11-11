package usecase

import (
	"hackathon/dao"
	"hackathon/model"
)

func ResForHTTPGet(UserId string) (model.ConsResForHTTPGet, error) {
	point, ServerErr := dao.GetPointSum(UserId)
	ReceivedCons, ServerErr := dao.GetReceivedCons(UserId)
	SentCons, _ := dao.GetSentCons(UserId)
	Response := model.ConsResForHTTPGet{Point: point, ReceivedCons: ReceivedCons, SentCons: SentCons}
	return Response, ServerErr
}
