import client from "./db-connection.js";

export async function readClientDB(id) {
  const clientKey = "client:" + id;
  const resp = await client.get(clientKey);
  return JSON.parse(resp);
}

export async function createClientDB(id, data) {
  const res = await client.set("client:" + id, JSON.stringify(data));
}

export async function updateClientDB(id, data) {
  const res = await client.set("client:" + id, JSON.stringify(data));
}

export async function deleteClientDB(id) {
  const res = await client.del("client:" + id);
}
