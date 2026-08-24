import pg from "pg";
import { Redis } from "ioredis";
import config from "../config.js";

const Pool = pg.Pool;

export const redisClient = new Redis(config.redis.url);

redisClient.on("error", (err) => {
  console.log(err);
});

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.name,
  password: config.db.password || undefined,
  port: config.db.port,
  ssl: false,
});

export default pool;
