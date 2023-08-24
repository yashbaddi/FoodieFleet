import pool from "./db-connection.js";

export default {
  createSession: createSession,
  readSession: readSession,
  deleteSession: deleteSession,
};

async function createSession(userID) {
  const sessionData = (
    await pool.query("INSERT INTO Sessions(User_ID) VALUES($1) RETURNING *", [
      userID,
    ])
  ).rows;
  return sessionData;
}

async function readSession(ID) {
  const sessionData = (
    await pool.query("SELECT * FROM Sessions WHERE id=$1", [ID])
  ).rows;
  return sessionData;
}

async function deleteSession(ID) {
  const rowCount = (await pool.query("DELETE FROM Sessions WHERE ID=$1", [ID]))
    .rowCount;

  return rowCount;
}
