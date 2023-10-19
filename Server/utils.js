import querystring from "querystring";
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
  console.log("queryString", params);
  const authURL = "http://localhost:4000/oauth/authorize?" + params.toString();
  return authURL;
}
