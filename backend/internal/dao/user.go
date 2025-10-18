package dao

import "github.com/google/uuid"

type User struct {
	Id       uuid.UUID `db:"id"`
	Name     string    `db:"name"`
	Email    string    `db:"email"`
	Password string    `db:"password"`
}

func (u User) TableName() string {
	return "users"
}
