import pool from "./db-connection.js";

const userModel = {
  createUserIfNotExists: createUserIfNotExists,
  createUserWithPassword: createUserWithPassword,
  findUserByEmail: findUserByEmail,
  readUser: readUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};

async function createUserIfNotExists(id) {
  const userData = (
    await pool.query(
      "INSERT INTO users(id) VALUES($1) ON CONFLICT (id) DO NOTHING RETURNING id",
      [id]
    )
  ).rows;
  return userData;
}

async function createUserWithPassword({ name, phone, email, passwordHash }) {
  const userData = (
    await pool.query(
      "INSERT INTO users(name, phone, email, password_hash) VALUES($1, $2, $3, $4) RETURNING id, name, phone, email",
      [name, phone, email, passwordHash]
    )
  ).rows[0];
  return userData;
}

async function findUserByEmail(email) {
  const userData = (
    await pool.query("SELECT * FROM users WHERE LOWER(email) = LOWER($1)", [email])
  ).rows[0];
  return userData;
}

async function readUser(filters = {}) {
  if (filters.id) {
    return (await pool.query("SELECT id, name, phone, email FROM users WHERE id=$1", [filters.id]))
      .rows;
  }
  if (filters.email) {
    return (await pool.query("SELECT id, name, phone, email FROM users WHERE LOWER(email)=LOWER($1)", [filters.email]))
      .rows;
  }
}

async function updateUser(userID, user) {
  const userData = (
    await pool.query(
      "UPDATE users SET name=$2, phone=$3, email=$4 WHERE id=$1 RETURNING id, name, phone, email",
      [userID, user.name, user.phone, user.email]
    )
  ).rows;
  return userData;
}

async function deleteUser(filters) {
  if (filters.id) {
    return await pool.query("DELETE FROM users WHERE id=$1", [filters.id]);
  }
}

export default userModel;
