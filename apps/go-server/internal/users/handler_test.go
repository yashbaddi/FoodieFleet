package users

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHandler_LoginCookie(t *testing.T) {
	svc := NewService(nil, "secret123")
	handler := NewHandler(svc)

	t.Run("setTokenCookie sets valid cookie header", func(t *testing.T) {
		rec := httptest.NewRecorder()
		dummyToken := "sample.jwt.token"

		handler.setTokenCookie(rec, dummyToken)

		cookies := rec.Result().Cookies()
		var tokenCookie *http.Cookie
		for _, c := range cookies {
			if c.Name == "token" {
				tokenCookie = c
				break
			}
		}

		if tokenCookie == nil {
			t.Fatalf("expected token cookie to be present")
		}

		if tokenCookie.Value != dummyToken {
			t.Errorf("expected cookie value %q, got %q", dummyToken, tokenCookie.Value)
		}

		if tokenCookie.Path != "/" {
			t.Errorf("expected cookie path '/', got %q", tokenCookie.Path)
		}

		if tokenCookie.MaxAge <= 0 {
			t.Errorf("expected positive MaxAge, got %d", tokenCookie.MaxAge)
		}
	})

	t.Run("Logout clears cookie", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/logout", nil)
		rec := httptest.NewRecorder()

		handler.Logout(rec, req)

		if rec.Code != http.StatusOK {
			t.Errorf("expected status %d, got %d", http.StatusOK, rec.Code)
		}

		cookies := rec.Result().Cookies()
		var tokenCookie *http.Cookie
		for _, c := range cookies {
			if c.Name == "token" {
				tokenCookie = c
				break
			}
		}

		if tokenCookie == nil {
			t.Fatalf("expected token cookie to be set on logout")
		}

		if tokenCookie.Value != "" || tokenCookie.MaxAge > 0 {
			t.Errorf("expected cookie to be cleared, got value=%q, maxAge=%d", tokenCookie.Value, tokenCookie.MaxAge)
		}
	})

	t.Run("Me returns unauthorized when context lacks userID", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/me", nil)
		rec := httptest.NewRecorder()

		handler.Me(rec, req)

		if rec.Code != http.StatusUnauthorized {
			t.Errorf("expected status %d, got %d", http.StatusUnauthorized, rec.Code)
		}
	})

	t.Run("Me returns user info when authenticated context present", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/me", nil)
		rec := httptest.NewRecorder()

		ctx := context.WithValue(req.Context(), UserIDKey, "test-user-id")
		handler.Me(rec, req.WithContext(ctx))

		if rec.Code == http.StatusUnauthorized {
			t.Errorf("expected non-unauthorized status when context has userID")
		}
	})

	t.Run("Login invalid payload returns bad request", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/login", bytes.NewBufferString("invalid json"))
		rec := httptest.NewRecorder()

		handler.Login(rec, req)

		if rec.Code != http.StatusBadRequest {
			t.Errorf("expected status %d, got %d", http.StatusBadRequest, rec.Code)
		}
	})

	t.Run("Register missing required fields returns bad request", func(t *testing.T) {
		body, _ := json.Marshal(RegisterRequest{Email: "test@example.com"})
		req := httptest.NewRequest(http.MethodPost, "/register", bytes.NewReader(body))
		rec := httptest.NewRecorder()

		handler.Register(rec, req)

		if rec.Code != http.StatusBadRequest {
			t.Errorf("expected status %d, got %d", http.StatusBadRequest, rec.Code)
		}
	})
}
