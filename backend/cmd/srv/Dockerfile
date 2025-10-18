#FROM golang:1.22.5-alpine
FROM golang:1.24.0-alpine AS builder


WORKDIR /app


COPY . .

RUN go mod tidy && go build cmd/srv/main.go

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/main /app/main

CMD ["sh", "-c", "./main"]
