package jwt

import (
	"testing"
)

func TestJWTTokenGenerationAndVerification(t *testing.T) {
	secret := "test-secret-key"
	userID := "user-12345"

	tokenStr, err := GenerateJWTToken(userID, secret)
	if err != nil {
		t.Fatalf("unexpected error generating token: %v", err)
	}

	if tokenStr == "" {
		t.Fatal("expected non-empty token string")
	}

	claims, err := VerifyJWTToken(tokenStr, secret)
	if err != nil {
		t.Fatalf("unexpected error verifying token: %v", err)
	}

	id, ok := claims["id"].(string)
	if !ok || id != userID {
		t.Errorf("expected user ID %q, got %v", userID, claims["id"])
	}
}

func TestVerifyJWTToken_InvalidSecret(t *testing.T) {
	secret := "test-secret-key"
	wrongSecret := "wrong-secret-key"
	userID := "user-12345"

	tokenStr, err := GenerateJWTToken(userID, secret)
	if err != nil {
		t.Fatalf("unexpected error generating token: %v", err)
	}

	_, err = VerifyJWTToken(tokenStr, wrongSecret)
	if err == nil {
		t.Error("expected error when verifying with wrong secret, got nil")
	}
}
