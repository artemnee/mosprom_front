package pg

import (
	"ed-platform/internal/config"
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	i_repo "ed-platform/internal/repo/i-repo"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"log/slog"
	"os"
	"time"
)

type PgDb struct {
	db *gorm.DB
}

func New(cfg *config.Config) (i_repo.IdbData, error) {
	d := connectDb(cfg.DatabaseDSN)
	pDb := &PgDb{db: d}
	err := pDb.migrate()
	if err != nil {
		return nil, err
	}
	slog.Info("Db Data: Postgres db initialized")

	return pDb, nil
}

func connectDb(databaseDSN string) *gorm.DB {
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  databaseDSN,
		PreferSimpleProtocol: false, // disables implicit prepared statement usage
	}), &gorm.Config{
		TranslateError: true,
	})
	if err != nil {
		slog.Error("Fail init DB connection", "err", err)
		os.Exit(1)
	}

	sqlDB, err := db.DB()
	if err != nil {
		slog.Error("Fail set settings to conn pool", "err", err)
		os.Exit(1)
	}
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetMaxIdleConns(50)
	sqlDB.SetConnMaxLifetime(time.Hour)
	sqlDB.SetConnMaxIdleTime(time.Minute * 15)

	return db
}

func (p *PgDb) migrate() error {

	var models = []any{
		&dao.User{}, &dao.Company{}, &dao.Community{}, &dao.FileAsset{}}

	slog.Info("Migrate models without relations")
	p.db.Config.DisableForeignKeyConstraintWhenMigrating = true
	if err := p.db.AutoMigrate(models...); err != nil {
		slog.Error("Migrate model error", "err", err)
	}
	p.db.Config.DisableForeignKeyConstraintWhenMigrating = false

	slog.Info("Migrate models with relations")
	if err := p.db.AutoMigrate(models...); err != nil {
		slog.Error("Migrate model error", "err", err)
	}
	return nil
}

func PaginationRequest(offset int, limit int, query *gorm.DB, target any) (res dto.PaginationResponse, err error) {
	// Count query
	if err := query.Session(&gorm.Session{}).Model(target).Count(&res.Count).Error; err != nil {
		return res, err
	}

	// Data query
	if err := query.Offset(offset).Limit(limit).Find(target).Error; err != nil {
		return res, err
	}

	res.Result = target
	res.Limit = limit
	res.Offset = offset

	return res, nil
}
