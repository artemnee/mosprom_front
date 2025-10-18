package bl

import (
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	i_repo "ed-platform/internal/repo/i-repo"
	"github.com/google/uuid"
)

type Community struct {
	db i_repo.IdbData
}

func NewCommunity(db i_repo.IdbData) *Community {
	return &Community{db: db}
}

func (c *Community) Create(req dto.CommunityReq, communityId uuid.UUID, author *dao.User) (*dao.Community, error) {
	community := dao.Community{
		Id: GenId().UUID,

		Title:       req.Title,
		Description: req.Description,
		LogoId:      uuid.NullUUID{},
		CreatedById: author.Id,
		CompanyId:   communityId,
	}

	cmp, err := c.db.CreateCommunity(community)

	if err != nil {
		return nil, err
	}

	return cmp, nil
}

func (c *Community) GetList(limit, offset int, companyId uuid.UUID) dto.PaginationResponse {
	res, err := c.db.GetCommunityList(limit, offset, companyId)
	if err != nil {
		return dto.PaginationResponse{}
	}
	return *res
}

func (c *Community) GetById(id, companyId uuid.UUID) (*dao.Community, error) {
	return c.db.GetCommunity(id, companyId)
}
