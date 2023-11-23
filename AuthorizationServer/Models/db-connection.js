// import { createClient } from "redis";
import { Redis } from "ioredis";
import config from "../config.js";
const client = new Redis(config.redis.url);

// const client = createClient({
//   // host: config.redis.host,
//   // port: config.redis.port,

//   // password: config.redis.password,
//   socket: {
//     path: config.redis.url,
//   },
// });

client.on("error", (err) => {
  console.log(err);
});

// await client.connect();

export default client;
