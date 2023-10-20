import pool from "./db-connection.js";

const userModel = {
  createUserIfNotExists: createUserIfNotExists,
  readUser: readUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};

async function createUserIfNotExists(id) {
  const userData = (
    await pool.query(
      "INSERT INTO users(id) VALUES($1) ON CONFLICT (ID) DO NOTHING RETURNING id",
      [id]
    )
  ).rows;
  return userData;
}

async function readUser(filters = {}) {
  if (filters.id) {
    return (await pool.query("SELECT * FROM users WHERE id=$1", [filters.id]))
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

async function patchUser(filters, data) {
  if (filters.username) {
    const userData = (
      await pool.query(
        "INSERT INTO users (auth_provider_username,name,phone,email,access_token) values($1,$2,$3,$4,$5) ON CONFLICT(auth_provider_username) UPDATE users SET name=$2 phone=$3 email=$4 access_token=$5",
        [filters.username]
      )
    ).rows;
  }
}

async function deleteUser(filters) {
  if (filters.id) {
    return await pool.query("DELETE FROM users WHERE id=$1", [filters.id]);
  }
}

export default userModel;

// async function createUser(newUser) {
//   console.log(newUser);
//   const userData = (
//     await pool.query(
//       "INSERT INTO users(id,name,phone,email) VALUES($1,$2,$3) RETURNING *",
//       [newUser.username, newUser.name, newUser.phone, newUser.email]
//     )
//   ).rows;
//   return userData;
// }
