import dotenv from "dotenv";
dotenv.config();

const config = {
  app: {
    port: Number(process.env.SERVER_PORT),
  },
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
  },
  oauth: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  },
};

export default config;
