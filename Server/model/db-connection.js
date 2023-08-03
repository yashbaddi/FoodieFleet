import pg from "pg";
const Pool = pg.Pool;

const pool = new Pool({
  user: "yashbaddi",
  host: "localhost",
  database: "foodiefleet",
  port: "5432",
});

export default pool;
