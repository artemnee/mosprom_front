package pg

import (
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
)

func (p *PgDb) CreateTag(tag *dao.Tag) (*dao.Tag, error) {
	if err := p.db.Create(&tag).Error; err != nil {
		return nil, err
	}
	return tag, nil
}

func (p *PgDb) GetTagList(limit, offset int) (*dto.PaginationResponse, error) {
	var tags []dao.Tag
	query := p.db.Order("name")
	request, err := PaginationRequest(offset, limit, query, &tags)
	if err != nil {
		return nil, err
	}
	return &request, nil
}
