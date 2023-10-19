import client from "./db-connection.js";

export async function readClientDB(id) {
  const res = await client.get("client:" + id);
  return JSON.parse(res);
}

export async function createClientDB(id, data) {
  const res = await client.set("client:" + id, JSON.stringify(data));
  console.log("createDB data", res);
}

export async function updateClientDB(id, data) {
  const res = await client.set("client:" + id, JSON.stringify(data));
  console.log("createDB data", res);
}

export async function deleteClientDB(id) {
  const res = await client.del("client:" + id);
  console.log(res);
}
