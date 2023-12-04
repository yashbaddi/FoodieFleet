import { validateJWTCookie } from "../utils.js";

export async function authMiddleware(req, res, next) {
  try {
    res.locals.userID = validateJWTCookie(req.cookies.token);
    next();
  } catch (e) {
    console.log("Error IN Auth MiddleWare", e);
    res.status(401).json({ message: "Unauthorized" });
  }
}
