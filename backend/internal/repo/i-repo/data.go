package i_repo

import (
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	"github.com/google/uuid"
)

type IdbData interface {
	IUser
	ICompany
}

type IUser interface {
	CreateUser(id uuid.UUID, name string, password string, email string) (*dao.User, error)
	GetUserByEmail(email string) (*dao.User, error)
	GetUserById(id uuid.UUID) (*dao.User, error)
}

type ICompany interface {
	CreateCompany(company dao.Company) (*dao.Company, error)
	GetCompanyList(limit, offset int) (dto.PaginationResponse, error)
}
