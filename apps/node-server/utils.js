import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "./config.js";

export function getUpdateExpression(updatedData) {
  const values = [];
  let updatePartialQuery = "";
  let index = 0;
  Object.entries(updatedData).forEach(([key, value]) => {
    updatePartialQuery = updatePartialQuery + ` ${key}=$${index + 1},`;
    values.push(value);
    index++;
  });
  return [updatePartialQuery.slice(0, -1), values];
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export function generateJWTToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
  };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });
}

export function validateJWTCookie(cookie) {
  if (!cookie) {
    throw new Error("No token provided");
  }
  let payload;
  try {
    payload = jwt.verify(cookie, config.jwtSecret);
  } catch (err) {
    // Fallback attempt with oauth clientSecret if legacy token exists
    if (config.oauth?.clientSecret) {
      payload = jwt.verify(cookie, config.oauth.clientSecret);
    } else {
      throw err;
    }
  }

  const userID = payload.id || (payload.sub && (payload.sub.id || payload.sub)) || payload.userID;
  if (!userID) {
    throw new Error("Invalid token payload");
  }
  return userID;
}
