package bl

import (
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	i_repo "ed-platform/internal/repo/i-repo"
	"github.com/google/uuid"
)

type Company struct {
	db i_repo.IdbData
}

func NewCompany(db i_repo.IdbData) *Company {
	return &Company{db: db}
}

func (c *Company) Create(req dto.CompanyReq, author *dao.User) (*dao.Company, error) {
	company := dao.Company{
		Id: GenId().UUID,

		Name:        req.Name,
		Description: req.Description,
		LogoId:      uuid.NullUUID{},
		CreatedById: author.Id,
		IsActive:    true, //TODO изменить на false верифицировать суперпользователем
	}

	cmp, err := c.db.CreateCompany(company)

	if err != nil {
		return nil, err
	}

	return cmp, nil
}

func (c *Company) GetList(limit, offset int) dto.PaginationResponse {
	res, _ := c.db.GetCompanyList(limit, offset)
	return res
}

func (c *Company) Get(id uuid.UUID) (*dao.Company, error) {
	return c.db.GetCompanyById(id)
}
