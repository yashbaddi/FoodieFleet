import client from "./db-connection.js";

export async function readTokenDB(id) {
  const res = await client.get("tokens:" + id);
  return JSON.parse(res);
}

export async function createTokenDB(id, data) {
  const res = await client.set("tokens:" + id, JSON.stringify(data));
}

export async function updateTokenDB(id, data) {
  const res = await client.set("tokens:" + id, JSON.stringify(data));
}

export async function deleteTokenDB(id) {
  const res = await client.del("tokens:" + id);
}
