import { readSessionDB } from "../Models/sessions.js";

export async function isAuthenticated(req, res, next) {
  console.log(req.cookies);
  console.log("session", await readSessionDB(req.cookies.sessionID));
  if (
    req.cookies.sessionID &&
    (await readSessionDB(req.cookies.sessionID)) === req.cookies.username
  ) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
