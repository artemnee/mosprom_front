package pg

import (
	api_error "ed-platform/internal/api-error"
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	"errors"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func (p *PgDb) CreateCommunity(community dao.Community) (*dao.Community, error) {
	if err := p.db.Create(&community).Error; err != nil {
		return nil, err
	}
	return &community, nil
}

func (p *PgDb) GetCommunityList(limit, offset int, companyId uuid.UUID) (*dto.PaginationResponse, error) {
	var communities []dao.Community
	query := p.db.Where("company_id = ?", companyId).Order("title DESC")

	res, err := PaginationRequest(offset, limit, query, &communities)
	if err != nil {
		return nil, err
	}
	return &res, nil
}

func (p *PgDb) GetCommunity(uuid, companyId uuid.UUID) (*dao.Community, error) {
	var community dao.Community
	err := p.db.
		Joins("Author").
		Joins("Company").
		Where("company_id = ?", companyId).
		Where("community.id = ?", uuid).First(&community).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, &api_error.CommunityNotFound
		}
		return nil, err
	}
	return &community, nil
}
