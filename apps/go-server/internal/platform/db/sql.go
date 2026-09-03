package db

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/yashbaddi/foodiefleet/internal/platform/config"
)

type Database struct {
	Pool *pgxpool.Pool
}

func NewPostgres(ctx context.Context, cfg config.DatabaseConfig) (*Database, error) {

	poolConfig, err := pgxpool.ParseConfig(cfg.URL)
	if err != nil {
		return nil, fmt.Errorf("parse postgres config failed %w", err)
	}

	poolConfig.MaxConns = int32(cfg.MaxConns)
	poolConfig.MinConns = int32(cfg.MinConns)

	pool, err := pgxpool.NewWithConfig(ctx, poolConfig)
	if err != nil {
		// logger
		fmt.Println("Unable to connect to database:", err)
		return nil, fmt.Errorf("Unable to connect: %w", err)
	}

	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf(
			"ping postgres: %w",
			err,
		)
	}

	db := &Database{
		Pool: pool,
	}
	return db, nil
}

func (db *Database) Close() error {
	//log here
	db.Pool.Close()
	return nil
}
