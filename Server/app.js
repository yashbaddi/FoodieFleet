import express from "express";
import config from "./config";

const app = express();

app.listen(config.app.port, () => {
  console.log(`applicaton Listening to port 3000 ${config.app.port}`);
});
