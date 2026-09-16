package users

import "errors"

var (
	ErrUserNotFound = errors.New("user not found")
	ErrUnauthorized = errors.New("unauthorized")
)
