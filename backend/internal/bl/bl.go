package bl

import (
	"ed-platform/internal/config"
	"ed-platform/internal/repo"
	"github.com/google/uuid"
)

type Bl struct {
	User      *User
	Company   *Company
	Community *Community
	Cfg       *config.Config
}

func New(repo *repo.Repo) *Bl {
	if repo == nil {
		return nil
	}
	return &Bl{
		NewUser(repo.DbData, repo.Config),
		NewCompany(repo.DbData),
		NewCommunity(repo.DbData),
		repo.Config,
	}
}

func GenId() uuid.NullUUID {
	id, err := uuid.NewV7()
	if err != nil {
		return uuid.NullUUID{}
	}

	return uuid.NullUUID{UUID: id, Valid: true}
}

func ToNullUUID(u *uuid.UUID) uuid.NullUUID {
	if u == nil {
		return uuid.NullUUID{Valid: false}
	}
	return uuid.NullUUID{
		UUID:  *u,
		Valid: true,
	}
}
