import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const config = {
  redis: {
    // host: process.env.REDIS_HOST,
    // port: parseInt(process.env.REDIS_PORT, 10),
    // user: process.env.REDIS_USER,
    // password: process.env.REDIS_PASSWORD,
    url: process.env.REDIS_URL,
  },
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  corsOrigin: process.env.CORS_URLS.split(" "),
};

export default config;
