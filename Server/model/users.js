import pool from "./db-connection.js";

export async function createUser(data) {
  console.log(data);
  const userID = (
    await pool.query(
      "INSERT INTO users(password,name,phone,email) VALUES($1,$2,$3,$4) RETURNING ID",
      [data.password, data.name, data.phone, data.email]
    )
  ).rows.id;
  return userID;
}

export async function readUser(filters = {}) {
  if (filters.id) {
    return (await pool.query("SELECT * FROM users WHERE id=$1", filters.id))
      .rows;
  }
}

export async function deleteUser(filters) {
  if (filters.id) {
    return await pool.query("DELETE FROM users WHERE id=$1", [filters.id]);
  }
}
