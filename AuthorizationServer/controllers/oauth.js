import express from "express";
import querystring from "querystring";

import oauthModel from "../oauth-model.js";
import OAuth2Server from "oauth2-server";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import config from "../config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// let authRequest, authResponse;

const oauth = new OAuth2Server({
  model: oauthModel,
  grants: ["authorization_code"],
  accessTokenLifetime: 60 * 60 * 24, // 24 hours, or 1 day
  allowEmptyState: true,
  allowExtendedTokenAttributes: true,
});

export async function authorizeHandler(req, res, next) {
  // authRequest = new OAuth2Server.Request(req);
  // authResponse = new OAuth2Server.Response(res);

  // res.cookie("x-auth-query", JSON.stringify(req.query));
  // res.cookies("x-auth-response", JSON.stringify(authResponse));

  res.redirect(
    `${config.host}/oauth/consent?` + querystring.stringify(req.query)
  );
}

export async function consentHandler(req, res, next) {
  express.static(path.join(__dirname, "../views"))(req, res, next);
}

export async function approveHandler(req, res, next) {
  try {
    const options = {
      authenticateHandler: {
        handle: (data) => {
          return { id: data.cookies.username };
        },
      },
    };

    const authRequest = new OAuth2Server.Request(req);
    const authResponse = new OAuth2Server.Response(res);

    const result = await oauth.authorize(authRequest, authResponse, options);

    if (result.authorizationCode) {
      const redirectUri = `${result.redirectUri}?code=${result.authorizationCode}`;
      res.redirect(redirectUri);
    } else {
      res.status(authResponse.status).send(authResponse.body);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export async function denyHandler(req, res, next) {
  res.status(403).send("Request Denied");
}

export async function tokenHandler(req, res, next) {
  try {
    const tokenRequest = new OAuth2Server.Request(req);
    const tokenResponse = new OAuth2Server.Response(res);

    const token = await oauth.token(tokenRequest, tokenResponse);

    res.json(token);
  } catch (e) {
    next(e);
  }
}
