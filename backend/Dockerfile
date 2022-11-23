# syntax=docker/dockerfile:1

FROM golang:1.18 as build

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY . ./

RUN go build -o /hackathon-server

EXPOSE 8080

CMD [ "/hackathon-server" ]