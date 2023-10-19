import express from "express";

const app = express();

app.use(express.static("Frontend"));

app.listen(4500);
