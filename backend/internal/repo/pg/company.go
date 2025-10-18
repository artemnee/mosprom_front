package pg

import (
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
)

func (p *PgDb) CreateCompany(company dao.Company) (*dao.Company, error) {

	if err := p.db.Create(&company).Error; err != nil {
		return nil, err
	}

	return &company, nil
}

func (p *PgDb) GetCompanyList(limit, offset int) (dto.PaginationResponse, error) {
	var companies []dao.Company
	query := p.db.Joins("Author").Where("is_active = ?", true)
	res, err := PaginationRequest(offset, limit, query, &companies)
	if err != nil {
		return res, err
	}
	return res, nil
}
