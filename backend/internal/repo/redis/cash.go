package redisDb

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/redis/go-redis/v9"
	"log/slog"
	"time"
)

type CacheData struct {
	ID      string      `json:"id"`
	Content interface{} `json:"content"`
	Tags    []string    `json:"tags"`
}

func (c *RedisDb) SetWithTags(ctx context.Context, key string, data interface{}, tags []string, ttl time.Duration) error {
	cacheData := CacheData{
		ID:      key,
		Content: data,
		Tags:    tags,
	}

	jsonData, err := json.Marshal(cacheData)
	if err != nil {
		return fmt.Errorf("failed to marshal data: %v", err)
	}

	pipe := c.client.TxPipeline()

	pipe.Set(ctx, key, jsonData, ttl)

	for _, tag := range tags {
		tagKey := c.getTagKey(tag)
		pipe.SAdd(ctx, tagKey, key)
		pipe.Expire(ctx, tagKey, ttl+time.Hour)
	}

	_, err = pipe.Exec(ctx)
	if err != nil {
		return fmt.Errorf("failed to execute transaction: %v", err)
	}

	return nil
}

func (c *RedisDb) Get(ctx context.Context, key string) (*CacheData, error) {
	data, err := c.client.Get(ctx, key).Result()
	if errors.Is(err, redis.Nil) {
		return nil, nil
	} else if err != nil {
		return nil, fmt.Errorf("failed to get data: %v", err)
	}

	var cacheData CacheData
	err = json.Unmarshal([]byte(data), &cacheData)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal data: %v", err)
	}

	return &cacheData, nil
}

func (c *RedisDb) InvalidateByTag(ctx context.Context, tag string) error {
	tagKey := c.getTagKey(tag)

	keys, err := c.client.SMembers(ctx, tagKey).Result()
	if err != nil {
		return fmt.Errorf("failed to get keys for tag: %v", err)
	}

	if len(keys) == 0 {
		return nil // Нет ключей для инвалидации
	}

	pipe := c.client.TxPipeline()

	pipe.Del(ctx, keys...)

	pipe.Del(ctx, tagKey)

	_, err = pipe.Exec(ctx)
	if err != nil {
		return fmt.Errorf("failed to invalidate by tag: %v", err)
	}

	slog.Info("Invalidated %d keys for tag '%s'", len(keys), tag)
	return nil
}

func (c *RedisDb) InvalidateByTags(ctx context.Context, tags []string) error {
	for _, tag := range tags {
		err := c.InvalidateByTag(ctx, tag)
		if err != nil {
			return err
		}
	}
	return nil
}

func (c *RedisDb) InvalidateByPattern(ctx context.Context, pattern string) error {
	var cursor uint64
	var allKeys []string

	for {
		keys, nextCursor, err := c.client.Scan(ctx, cursor, pattern, 100).Result()
		if err != nil {
			return fmt.Errorf("failed to scan keys: %v", err)
		}

		allKeys = append(allKeys, keys...)
		cursor = nextCursor

		if cursor == 0 {
			break
		}
	}

	if len(allKeys) == 0 {
		return nil
	}

	err := c.client.Del(ctx, allKeys...).Err()
	if err != nil {
		return fmt.Errorf("failed to delete keys: %v", err)
	}

	slog.Info(fmt.Sprintf("Invalidated %d keys for pattern '%s'\n", len(allKeys), pattern))
	return nil
}

func (c *RedisDb) GetKeysByTag(ctx context.Context, tag string) ([]string, error) {
	tagKey := c.getTagKey(tag)
	return c.client.SMembers(ctx, tagKey).Result()
}

func (c *RedisDb) getTagKey(tag string) string {
	return fmt.Sprintf("tag:%s", tag)
}

func (c *RedisDb) Close() error {
	return c.client.Close()
}
