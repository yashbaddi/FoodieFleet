import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v4 as uuid } from "uuid";

const app = express();

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "http://127.0.0.1:4500",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
  })
);

app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
  if (users[req.body.username]) {
    if (users[req.body.username].password === req.body.password) {
      const sessionID = uuid();
      sessions[sessionID] = req.body.username;
      console.log("session after login", sessions);
      res.cookie("username", req.body.username);
      res.cookie("sessionID", sessionID);
      res.status(201).json({ message: "loginSucess" });
    } else {
      res.status(401).json({ message: "Incorrect Password" });
    }
  } else {
    res.status(401).json({ message: "Invalid Username" });
  }
});

app.post("/logout", (req, res, next) => {
  sessions[req.cookies.sessionID] = undefined;
  res.clearCookie("sessionID");
  res.clearCookie("username");

  res.sendStatus(200);
});

app.get("/", authMiddleware, (req, res) => {
  res.send({ data: users[req.cookies.username].data });
});

app.listen(8000);
