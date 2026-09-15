package users

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/yashbaddi/foodiefleet/internal/users/jwt"
)

func TestAuthMiddleware(t *testing.T) {
	secret := "testsecret123"
	testUserID := "user-uuid-1234"

	svc := NewService(nil, secret)

	validToken, err := jwt.GenerateJWTToken(testUserID, secret)
	if err != nil {
		t.Fatalf("failed to generate token: %v", err)
	}

	handler := AuthMiddleware(svc)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		userID, ok := UserIDFromContext(r.Context())
		if !ok || userID != testUserID {
			t.Errorf("expected userID %s, got %s (ok=%v)", testUserID, userID, ok)
		}
		w.WriteHeader(http.StatusOK)
	}))

	t.Run("No token provided", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/protected", nil)
		rec := httptest.NewRecorder()

		handler.ServeHTTP(rec, req)

		if rec.Code != http.StatusUnauthorized {
			t.Errorf("expected status %d, got %d", http.StatusUnauthorized, rec.Code)
		}
	})

	t.Run("Valid token in Bearer header", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/protected", nil)
		req.Header.Set("Authorization", "Bearer "+validToken)
		rec := httptest.NewRecorder()

		handler.ServeHTTP(rec, req)

		if rec.Code != http.StatusOK {
			t.Errorf("expected status %d, got %d", http.StatusOK, rec.Code)
		}
	})

	t.Run("Valid token in Cookie", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/protected", nil)
		req.AddCookie(&http.Cookie{Name: "token", Value: validToken})
		rec := httptest.NewRecorder()

		handler.ServeHTTP(rec, req)

		if rec.Code != http.StatusOK {
			t.Errorf("expected status %d, got %d", http.StatusOK, rec.Code)
		}
	})

	t.Run("Invalid token", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/protected", nil)
		req.Header.Set("Authorization", "Bearer invalid.token.string")
		rec := httptest.NewRecorder()

		handler.ServeHTTP(rec, req)

		if rec.Code != http.StatusUnauthorized {
			t.Errorf("expected status %d, got %d", http.StatusUnauthorized, rec.Code)
		}
	})
}
