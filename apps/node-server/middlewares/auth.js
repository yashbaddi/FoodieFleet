import { validateJWTCookie } from "../utils.js";

export async function authMiddleware(req, res, next) {
  try {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    res.locals.userID = validateJWTCookie(token);
    next();
  } catch (e) {
    console.log("Error in Auth Middleware:", e.message || e);
    res.status(401).json({ message: "Unauthorized" });
  }
}
