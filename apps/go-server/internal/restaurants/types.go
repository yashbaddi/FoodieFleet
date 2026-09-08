package restaurants

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
)

type Restaurant struct {
	ID          string   `json:"id" db:"id"`
	Name        string   `json:"name" db:"name"`
	Description string   `json:"description" db:"description"`
	IsOpen      bool     `json:"is_open" db:"is_open"`
	Location    Location `json:"location" db:"location"`
}

type Location struct {
	Lat  float64 `json:"lat" db:"lat"`
	Long float64 `json:"lng" db:"lng"`
}

func (l *Location) Scan(value any) error {
	if value == nil {
		return nil
	}
	bytes, ok := value.([]byte)
	if !ok {
		str, ok := value.(string)
		if !ok {
			return fmt.Errorf("failed to unmarshal JSONB value: %v", value)
		}
		bytes = []byte(str)
	}
	return json.Unmarshal(bytes, l)
}

func (l Location) Value() (driver.Value, error) {
	return json.Marshal(l)
}
