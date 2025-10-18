package types

import "github.com/golang-jwt/jwt/v5"

type Token struct {
	JWT          *jwt.Token
	SignedString string
	Type         string
}
