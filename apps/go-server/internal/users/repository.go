package users

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	db *pgxpool.Pool
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{
		db: db,
	}
}

func (r *Repository) getCredentialsById(ctx context.Context, ID string) (*Credentials, error) {
	var cred Credentials
	query := `SELECT id, password_hash FROM users WHERE id = $1`
	err := r.db.QueryRow(ctx, query, ID).Scan(
		&cred.ID,
		&cred.Hash,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("Database Error: %w", err)
	}
	return &cred, nil
}

func (r *Repository) getCredentialsByEmail(ctx context.Context, email string) (*Credentials, error) {
	var cred Credentials
	query := `SELECT id, password_hash FROM users WHERE email = $1`
	err := r.db.QueryRow(ctx, query, email).Scan(
		&cred.ID,
		&cred.Hash,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("Database Error: %w", err)
	}
	return &cred, nil
}

func (r *Repository) getUserById(ctx context.Context, ID string) (*UserDTO, error) {
	var user UserDTO
	query := `SELECT id, name, email, phone FROM users WHERE id = $1`
	err := r.db.QueryRow(ctx, query, ID).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.Phone,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("Database Error: %w", err)
	}
	return &user, nil
}

func (r *Repository) getUserByEmail(ctx context.Context, email string) (*UserDTO, error) {
	var user UserDTO
	query := `SELECT id, name, email, phone FROM users WHERE email = $1`
	err := r.db.QueryRow(ctx, query, email).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.Phone,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrUserNotFound
		}
		return nil, fmt.Errorf("Database Error: %w", err)
	}
	return &user, nil
}

func (r *Repository) create(ctx context.Context, user *RegisterRequest, hashedPassword string) (*UserDTO, error) {
	query := `INSERT INTO users (name, email, phone, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, email, phone`
	var created UserDTO
	err := r.db.QueryRow(ctx, query, user.Name, user.Email, user.Phone, hashedPassword).Scan(
		&created.ID,
		&created.Name,
		&created.Email,
		&created.Phone,
	)
	if err != nil {
		return nil, fmt.Errorf("Database Error: %w", err)
	}
	return &created, nil
}

func (r *Repository) getIdByEmail(ctx context.Context, email string) (string, error) {
	query := `SELECT id FROM users WHERE email = $1`
	var id string
	err := r.db.QueryRow(ctx, query, email).Scan(&id)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return "", ErrUserNotFound
		}
		return "", fmt.Errorf("Database Error: %w", err)
	}
	return id, nil
}
