import pool from "./db-connection.js";

const userModel = {
  createUser: createUser,
  readUser: readUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};

async function createUser(newUser) {
  console.log(newUser);
  const userData = (
    await pool.query(
      "INSERT INTO users(name,phone,email) VALUES($1,$2,$3) RETURNING *",
      [newUser.name, newUser.phone, newUser.email]
    )
  ).rows;
  return userData;
}

async function readUser(filters = {}) {
  if (filters.id) {
    return (await pool.query("SELECT * FROM users WHERE id=$1", filters.id))
      .rows;
  }
}

async function updateUser(userID, user) {
  const userData = (
    await pool.query(
      "UPDATE users SET name=$2 phone=$3 email=$4 WHERE id=$1 RETURNING *",
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
