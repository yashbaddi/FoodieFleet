import pg from "pg";
import { Redis } from "ioredis";
import config from "../config.js";

const Pool = pg.Pool;

export const redisClient = new Redis(config.redis.url);

redisClient.on("error", (err) => {
  console.log(err);
});

// await redisClient.connect();

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.name,
  port: config.db.port,
  password: config.db.password,
});

export default pool;
