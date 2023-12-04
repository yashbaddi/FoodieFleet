import querystring from "querystring";
import config from "./config.js";

import jwt from "jsonwebtoken";
import userService from "./services/users.js";

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

  //   return { expression: expression.slice(0, -1), values: values };
}

export function generateAuthUrl() {
  const params = querystring.stringify({
    client_id: config.oauth.clientID,
    redirect_uri: config.oauth.redirectUri,
    response_type: "code",
    scope: "profile",
    state: "randomstring",
  });
  const authURL =
    config.oauth.providerURL + "/oauth/authorize?" + params.toString();
  return authURL;
}

export function generateAuthTokenForm(code, redirectUri) {
  const data = new URLSearchParams({
    client_id: config.oauth.clientID,
    client_secret: config.oauth.clientSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUri,
    code: code,
  });
  return data.toString();
}

export function getTimeInHHMMFormat() {
  return `${new Date().getHours()}${
    new Date().getMinutes() < 10 ? "0" : ""
  }${new Date().getMinutes()}`;
}

export function validateJWTCookie(cookie) {
  const payload = jwt.verify(cookie, config.oauth.clientSecret);
  const userID = payload.sub.id;
  userService.createUserIfNotExists(userID);
  return userID;
}
