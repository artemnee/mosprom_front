package dao

import (
	"github.com/google/uuid"
	"time"
)

type Company struct {
	Id uuid.UUID `gorm:"type:uuid;primary_key" json:"id"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	Name        string        `json:"name"`
	Description string        `json:"description"`
	LogoId      uuid.NullUUID `json:"logo"`

	CreatedById uuid.NullUUID `json:"created_by,omitempty" extensions:"x-nullable"`

	Author    *User      `json:"author,omitempty" gorm:"foreignKey:CreatedById" extensions:"x-nullable"`
	LogoAsset *FileAsset `json:"logo_details" gorm:"foreignKey:LogoId" extensions:"x-nullable"`

	IsActive bool `json:"is_active"`
}

func (c Company) TableName() string {
	return "company"
}
