package response_test

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/yashbaddi/foodiefleet/internal/platform/response"
)

func TestJSON(t *testing.T) {
	t.Run("successful json payload", func(t *testing.T) {
		rec := httptest.NewRecorder()
		data := map[string]string{"key": "value"}

		err := response.JSON(rec, http.StatusOK, data)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if rec.Code != http.StatusOK {
			t.Errorf("expected status %d, got %d", http.StatusOK, rec.Code)
		}

		if contentType := rec.Header().Get("Content-Type"); contentType != "application/json" {
			t.Errorf("expected Content-Type application/json, got %q", contentType)
		}

		var result map[string]string
		if err := json.Unmarshal(rec.Body.Bytes(), &result); err != nil {
			t.Fatalf("failed to decode response: %v", err)
		}

		if result["key"] != "value" {
			t.Errorf("expected key to be 'value', got %q", result["key"])
		}
	})

	t.Run("nil payload", func(t *testing.T) {
		rec := httptest.NewRecorder()

		err := response.JSON(rec, http.StatusNoContent, nil)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if rec.Code != http.StatusNoContent {
			t.Errorf("expected status %d, got %d", http.StatusNoContent, rec.Code)
		}

		if rec.Body.Len() != 0 {
			t.Errorf("expected empty body, got %s", rec.Body.String())
		}
	})
}

func TestError(t *testing.T) {
	rec := httptest.NewRecorder()
	errMsg := "resource not found"

	err := response.Error(rec, http.StatusNotFound, errMsg)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if rec.Code != http.StatusNotFound {
		t.Errorf("expected status %d, got %d", http.StatusNotFound, rec.Code)
	}

	if contentType := rec.Header().Get("Content-Type"); contentType != "application/json" {
		t.Errorf("expected Content-Type application/json, got %q", contentType)
	}

	var errResp response.ErrorResponse
	if err := json.Unmarshal(rec.Body.Bytes(), &errResp); err != nil {
		t.Fatalf("failed to decode error response: %v", err)
	}

	if errResp.Message != errMsg {
		t.Errorf("expected message %q, got %q", errMsg, errResp.Message)
	}
}
