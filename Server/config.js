import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const config = {
  app: {
    port: Number(process.env.SERVER_PORT),
    corsOrigin: process.env.CORS_URLS ? process.env.CORS_URLS.split(" ") : [],
  },
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  oauth: {
    providerURL: process.env.OAUTH_PROVIDER,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
};

export default config;
