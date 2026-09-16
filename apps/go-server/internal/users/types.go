package users

type Credentials struct {
	ID   string `json:"id" db:"id"`
	Hash string `json:"hash" db:"password_hash"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RegisterRequest struct {
	Name     string `json:"name"`
	Phone    string `json:"phone"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserDTO struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Phone string `json:"phone"`
}

type AuthResponse struct {
	Message string  `json:"message"`
	User    UserDTO `json:"user"`
	Token   string  `json:"token"`
}
