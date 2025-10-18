package repo

import (
	"ed-platform/internal/config"
	elasticrepo "ed-platform/internal/repo/es"
	irepo "ed-platform/internal/repo/i-repo"
	miniostore "ed-platform/internal/repo/minio"
	"ed-platform/internal/repo/pg"
	"log/slog"
)

type Repo struct {
	DbData irepo.IdbData
	Store  irepo.IStore
	Es     irepo.IdbDoc
	Config *config.Config
}

func New(cfg *config.Config) *Repo {
	r := &Repo{}
	r.Config = cfg

	if db, err := pg.New(cfg); err != nil {
		slog.Error("Failed to connect to postgres database", "error", err)
		return nil
	} else {
		r.DbData = db
	}

	if store, err := miniostore.New(cfg); err != nil {
		slog.Error("Failed to connect to minio database", "error", err)
		return nil
	} else {
		r.Store = store
	}

	if es, err := elasticrepo.New(cfg); err != nil {
		slog.Error("Failed to connect to elastic repo", "error", err)
		return nil
	} else {
		r.Es = es
	}

	slog.Info("=== Repo initialized ===")

	return r

}
