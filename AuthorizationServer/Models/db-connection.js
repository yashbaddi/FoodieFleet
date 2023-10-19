import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => {
  console.log(err);
});

await client.connect();

export default client;
