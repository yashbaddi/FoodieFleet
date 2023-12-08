import { createSessionDB, deleteSessionDB } from "../Models/sessions.js";
import { readUserDB } from "../Models/users.js";
import { v4 as uuid } from "uuid";

export async function createSession(req, res, next) {
  const user = await readUserDB(req.body.username);
  if (user) {
    if (user.password == req.body.password) {
      const sessionID = uuid();
      await createSessionDB(sessionID, req.body.username);
      res.cookie("username", req.body.username);
      res.cookie("sessionID", sessionID);
      res.status(201).json({ message: "Login Sucess" });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
}

export async function deleteSession(req, res, next) {
  await deleteSessionDB(req.cookies.sessionID);
  res.clearCookie("sessionID");
  res.clearCookie("username");

  res.sendStatus(200);
}

export async function authorizeSession(req, res, next) {
  res.send({ data: "Logged In" });
}
