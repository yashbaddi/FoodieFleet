import config from "../config.js";
import { generateAuthTokenForm, generateAuthUrl } from "../utils.js";

const authController = {
  authorize: authorize,
  authCallback: authCallback,
};

async function authorize(req, res) {
  res.redirect(generateAuthUrl());
}

async function authCallback(req, res) {
  const code = req.query.code;
  const tokenData = await fetch(config.oauth.providerURL + "/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: generateAuthTokenForm(code, config.oauth.redirectUri),
  });
  const tokenDataBody = await tokenData.json();

  console.log("token getn", tokenDataBody);

  res.cookie("token", tokenDataBody.accessToken);

  res.redirect(302, config.app.clientURL);
}

export default authController;
