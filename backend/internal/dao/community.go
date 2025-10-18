package dao

import (
	"github.com/google/uuid"
	"time"
)

type Community struct {
	Id uuid.UUID `gorm:"type:uuid;primary_key" json:"id"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	Title       string        `json:"title"`
	Description string        `json:"description"`
	LogoId      uuid.NullUUID `json:"logo"`

	CreatedById uuid.UUID `json:"created_by_id" gorm:"type:uuid"`
	CompanyId   uuid.UUID `gorm:"type:uuid;index" json:"company_id"`

	Author    *User      `json:"author,omitempty" gorm:"foreignKey:CreatedById" extensions:"x-nullable"`
	LogoAsset *FileAsset `json:"logo_details" gorm:"foreignKey:LogoId" extensions:"x-nullable"`

	Company *Company `json:"company,omitempty" gorm:"foreignKey:CompanyId" extensions:"x-nullable"`
}

func (c Community) TableName() string {
	return "community"
}

type Tag struct {
	Id          uuid.UUID `gorm:"type:uuid;primary_key" json:"id"`
	Name        string    `gorm:"uniqueIndex" json:"name"`
	Description string    `json:"description"`
}

type CommunityTag struct {
	Id uuid.UUID `gorm:"type:uuid;primary_key" json:"id"`

	TagId       uuid.UUID `gorm:"type:uuid;index" json:"tag_id"`
	CompanyId   uuid.UUID `gorm:"type:uuid;index" json:"company_id"`
	CommunityId uuid.UUID `gorm:"type:uuid;index" json:"community_id"`
}

func (c CommunityTag) TableName() string {
	return "community_tag"
}
