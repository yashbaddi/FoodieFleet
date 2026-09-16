package redis

import (
	"context"

	"github.com/redis/go-redis/v9"
	"github.com/yashbaddi/foodiefleet/internal/platform/config"
)

func NewRedis(cfg config.RedisConfig, ctx context.Context) (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     cfg.Addr,
		Password: cfg.Password,
		DB:       0,
	})

	if _, err := client.Ping(ctx).Result(); err != nil {
		return nil, err
	}

	return client, nil
}
