import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const config = {
  api: {
    url: "https://foodie-fleet-node-server.onrender.com/",
    wsURL: "ws://foodie-fleet-node-server.onrender.com/",
  },
};

export default config;