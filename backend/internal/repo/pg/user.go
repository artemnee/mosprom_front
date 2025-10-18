package pg

import (
	"ed-platform/internal/dao"
	"github.com/google/uuid"
)

func (p *PgDb) CreateUser(id uuid.UUID, name string, password string, email string) (*dao.User, error) {

	user := dao.User{
		Id:       id,
		Name:     name,
		Email:    email,
		Password: password,
	}

	if err := p.db.Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (p *PgDb) GetUserByEmail(email string) (*dao.User, error) {
	var user dao.User
	if err := p.db.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (p *PgDb) GetUserById(id uuid.UUID) (*dao.User, error) {
	var user dao.User
	if err := p.db.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
