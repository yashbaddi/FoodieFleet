import pool from "./db-connection.js";

export async function createUser(data) {
  console.log(data);
  const userData = (
    await pool.query(
      "INSERT INTO users(name,phone,email) VALUES($1,$2,$3) RETURNING *",
      [data.name, data.phone, data.email]
    )
  ).rows;
  return userData;
}

export async function readUser(filters = {}) {
  if (filters.id) {
    return (await pool.query("SELECT * FROM users WHERE id=$1", filters.id))
      .rows;
  }
}

export async function updateUser(userID, data) {
  const userData = (
    await pool.query(
      "UPDATE users SET name=$2 phone=$3 email=$4 WHERE id=$1 RETURNING *",
      [userID, data.name, data.phone, data.email]
    )
  ).rows;
  return userData;
}

export async function deleteUser(filters) {
  if (filters.id) {
    return await pool.query("DELETE FROM users WHERE id=$1", [filters.id]);
  }
}
