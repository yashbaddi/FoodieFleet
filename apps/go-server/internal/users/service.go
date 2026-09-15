package users

import (
	"context"
	"fmt"

	"github.com/golang-jwt/jwt/v5"
	"github.com/yashbaddi/foodiefleet/internal/users/hash"
	authjwt "github.com/yashbaddi/foodiefleet/internal/users/jwt"
)

type Service struct {
	repo      *Repository
	jwtSecret string
}

func NewService(repo *Repository, jwtSecret string) *Service {
	return &Service{
		repo:      repo,
		jwtSecret: jwtSecret,
	}
}

func (svc *Service) Login(ctx context.Context, l LoginRequest) (string, *UserDTO, error) {
	if svc.repo == nil {
		return "", nil, fmt.Errorf("repository not initialized")
	}

	isValid, err := svc.validatePassword(ctx, l.Email, l.Password)
	if err != nil {
		return "", nil, err
	}
	if !isValid {
		return "", nil, ErrUnauthorized
	}

	user, err := svc.repo.getUserByEmail(ctx, l.Email)
	if err != nil {
		return "", nil, err
	}

	token, err := authjwt.GenerateJWTToken(user.ID, svc.jwtSecret)
	if err != nil {
		return "", nil, err
	}

	return token, user, nil
}

func (svc *Service) Register(ctx context.Context, userReq *RegisterRequest) (string, *UserDTO, error) {
	if svc.repo == nil {
		return "", nil, fmt.Errorf("repository not initialized")
	}

	hashedPassword, err := hash.HashPassword(userReq.Password)
	if err != nil {
		return "", nil, fmt.Errorf("failed to hash password: %w", err)
	}

	user, err := svc.repo.create(ctx, userReq, hashedPassword)
	if err != nil {
		return "", nil, err
	}

	token, err := authjwt.GenerateJWTToken(user.ID, svc.jwtSecret)
	if err != nil {
		return "", nil, err
	}

	return token, user, nil
}

func (svc *Service) GetCurrentUser(ctx context.Context, userId string) (*UserDTO, error) {
	if svc.repo == nil {
		return nil, fmt.Errorf("repository not initialized")
	}

	user, err := svc.repo.getUserById(ctx, userId)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (svc *Service) validatePassword(ctx context.Context, email string, pass string) (bool, error) {
	if svc.repo == nil {
		return false, fmt.Errorf("repository not initialized")
	}

	cred, err := svc.repo.getCredentialsByEmail(ctx, email)
	if err != nil {
		return false, err
	}

	return hash.ComparePassword(pass, cred.Hash), nil
}

func (svc *Service) VerifyToken(tokenStr string) (jwt.MapClaims, error) {
	return authjwt.VerifyJWTToken(tokenStr, svc.jwtSecret)
}

func (svc *Service) ValidateToken(tokenStr string) (string, error) {
	claims, err := svc.VerifyToken(tokenStr)
	if err != nil {
		return "", err
	}

	userID, ok := claims["id"].(string)
	if !ok || userID == "" {
		return "", fmt.Errorf("invalid token claims")
	}

	return userID, nil
}
