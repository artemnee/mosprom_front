package pg

import (
	api_error "ed-platform/internal/api-error"
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	"github.com/google/uuid"
	"gorm.io/gorm"
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

func (p *PgDb) GetCompanyById(id uuid.UUID) (*dao.Company, error) {
	var company dao.Company
	if err := p.db.Joins("Author").Where("company.id = ?", id).First(&company).Error; err != nil {
		if gorm.ErrRecordNotFound != nil {
			return nil, &api_error.CompanyNotFound
		}
		return nil, err
	}
	return &company, nil
}
