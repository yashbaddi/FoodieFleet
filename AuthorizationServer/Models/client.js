import client from "./db-connection.js";

export async function readClientDB(id) {
  // console.log("the read Client ID:", "client:" + id);
  const clientKey = "client:" + id;
  console.log(clientKey);
  const resp = await client.get(clientKey);
  console.log(resp);
  return JSON.parse(resp);
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
