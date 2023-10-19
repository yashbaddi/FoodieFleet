import client from "./db-connection.js";

export async function readUserDB(id) {
  const res = await client.get("users:" + id);
  return JSON.parse(res);
}

export async function createUserDB(id, data) {
  const res = await client.set("users:" + id, JSON.stringify(data));
  console.log("createDB data", res);
}

export async function updateUserDB(id, data) {
  const res = await client.set("users:" + id, JSON.stringify(data));
  console.log("createDB data", res);
}

export async function deleteUserDB(id) {
  const res = await client.del("usersUser:" + id);
  console.log(res);
}
