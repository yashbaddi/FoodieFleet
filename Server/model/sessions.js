import pool from "./db-connection.js";

export async function createSession(userID) {
  const sessionData = (
    await pool.query("INSERT INTO Sessions(User_ID) VALUES($1) RETURNING *", [
      userID,
    ])
  ).rows;
  return sessionData;
}
