import client from "./db-connection.js";

export async function readSessionDB(id) {
  const res = await client.get("sessions:" + id);
  return JSON.parse(res);
}

export async function createSessionDB(id, data) {
  const res = await client.set("sessions:" + id, JSON.stringify(data));
}

export async function updateSessionDB(id, data) {
  const res = await client.set("sessions:" + id, JSON.stringify(data));
}

export async function deleteSessionDB(id) {
  const res = await client.del("sessions:" + id);
}
