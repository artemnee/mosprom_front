package dao

import (
	"github.com/google/uuid"
	"time"
)

type Achievement struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	Title       string `gorm:"not null" json:"title"`
	Description string `json:"description"`
	IconURL     string `json:"icon_url"`
	Points      int    `json:"points"`

	CreatedByID uuid.UUID `gorm:"type:uuid" json:"created_by_id"`
	CompanyId   uuid.UUID `gorm:"type:uuid;index" json:"company_id"`
	CommunityId uuid.UUID `gorm:"type:uuid;index" json:"community_id"`

	ConditionExpression string `gorm:"type:text" json:"condition_expression"`

	IsActive bool `gorm:"default:true" json:"is_active"`

	Author    *User      `json:"author,omitempty" gorm:"foreignKey:CreatedById" extensions:"x-nullable"`
	Company   *Company   `json:"company,omitempty" gorm:"foreignKey:CompanyId" extensions:"x-nullable"`
	Community *Community `json:"community,omitempty" gorm:"foreignKey:CommunityId" extensions:"x-nullable"`
}

func (a Achievement) TableName() string {
	return "achievement"
}
