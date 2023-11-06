import pg from "pg";
import { createClient } from "redis";
import config from "../config.js";

const Pool = pg.Pool;

export const redisClient = createClient();

redisClient.on("error", (err) => {
  console.log(err);
});

await redisClient.connect();

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.name,
  port: config.db.port,
});

export default pool;
