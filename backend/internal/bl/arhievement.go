package bl

import (
	irepo "ed-platform/internal/repo/i-repo"
)

type Achievement struct {
	db irepo.IdbData
}

func NewAchievement(db irepo.IdbData) *Achievement {
	return &Achievement{db: db}
}
