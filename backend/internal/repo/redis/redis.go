package redisDb

import (
	i_repo "ed-platform/internal/repo/i-repo"
	"github.com/redis/go-redis/v9"
	"log/slog"
)

type RedisDb struct {
	client *redis.Client
}

func New() i_repo.IdbDoc {
	db := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "my-password",
		DB:       15,
		//Username:     cfg.User,
		//MaxRetries:   cfg.MaxRetries,
		//DialTimeout:  cfg.DialTimeout,
		//ReadTimeout:  cfg.Timeout,
		//WriteTimeout: cfg.Timeout,
	})
	slog.Info("Db Doc: Redis db initialized")

	return &RedisDb{client: db}
}
