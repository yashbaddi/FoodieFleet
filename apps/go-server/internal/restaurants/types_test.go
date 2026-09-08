package restaurants

import (
	"testing"
)

func TestLocationScanAndValue(t *testing.T) {
	loc := Location{}
	jsonData := []byte(`{"lat": 37.7749, "lng": -122.4194}`)

	if err := loc.Scan(jsonData); err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if loc.Lat != 37.7749 || loc.Long != -122.4194 {
		t.Errorf("unexpected location scanned: %+v", loc)
	}

	val, err := loc.Value()
	if err != nil {
		t.Fatalf("expected no error on Value(), got %v", err)
	}

	if val == nil {
		t.Fatal("expected non-nil driver value")
	}
}
