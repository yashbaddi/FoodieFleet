import pg from "pg";
import config from "../config.js";

const Pool = pg.Pool;

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.name,
  port: config.db.port,
});

export default pool;
