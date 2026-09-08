package restaurants

import (
	"context"

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

func (r *Repository) List(ctx context.Context) ([]Restaurant, error) {
	query := `SELECT id,name,description,is_open,location from restaurants;`
	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []Restaurant
	for rows.Next() {
		var res Restaurant
		if err := rows.Scan(&res.ID, &res.Name, &res.Description, &res.IsOpen, &res.Location); err != nil {
			return nil, err
		}
		result = append(result, res)
	}
	return result, nil

}
