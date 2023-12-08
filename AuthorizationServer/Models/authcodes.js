import client from "./db-connection.js";

export async function readCodeDB(id) {
  const res = await client.get("code:" + id);
  return JSON.parse(res);
}

export async function createCodeDB(id, data) {
  const res = await client.set("code:" + id, JSON.stringify(data));
}

export async function updateCodeDB(id, data) {
  const res = await client.set("code:" + id, JSON.stringify(data));
}

export async function deleteCodeDB(id) {
  const res = await client.del("code:" + id);
}
