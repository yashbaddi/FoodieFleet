//A model part of the oauth2-server
import jsonwebtoken from "jsonwebtoken";
import { readClientDB } from "./Models/client.js";
import { createCodeDB, deleteCodeDB, readCodeDB } from "./Models/authcodes.js";
import { createTokenDB, readTokenDB } from "./Models/tokens.js";

const oauthModel = {
  getClient: async (clientId, clientSecret) => {
    const client = await readClientDB(clientId);
    return {
      id: clientId,
      clientSecret: clientSecret,
      redirectUris: client.redirectUris,
      grants: client.grants,
    };
  },
  getUser: async (username) => {
    return { id: username };
  },

  saveAuthorizationCode: async (code, client, user) => {
    await createCodeDB(code.authorizationCode, {
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      redirectUri: code.redirectUri,
      scope: code.scope,
      client: client,
      user: user,
    });
    return code;
  },

  getAuthorizationCode: async (authCode) => {
    const savedCode = await readCodeDB(authCode);
    return {
      code: authCode,
      expiresAt: new Date(savedCode.expiresAt),
      redirectUri: savedCode.redirectUri,
      scope: savedCode.scope,
      client: savedCode.client,
      user: savedCode.user,
    };
  },

  revokeAuthorizationCode: async (code) => {
    if ((await readCodeDB(code.code)) !== undefined) {
      await deleteCodeDB(code.code);
      return true;
    }
    return false;
  },

  generateAccessToken: async (client, user, scope) => {
    const payload = {
      iss: "MyOAuthProvider",
      sub: user,
      exp: Date.now() + 30 * 24 * 60 * 60,
      iat: Date.now(),
      // aud: client,
      scope: scope,
    };
    return jsonwebtoken.sign(payload, client.clientSecret);
  },

  saveToken: async (token, client, user) => {
    await createTokenDB(token.accessToken, {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      client: client,
      user: user,
    });
    const readToken = await readTokenDB(token.accessToken);
    readToken.accessTokenExpiresAt = new Date(readToken.accessTokenExpiresAt);
    readToken.refreshTokenExpiresAt = new Date(readToken.refreshTokenExpiresAt);

    return readToken;
  },

  getAccessToken: async (accessToken) => {
    const tokenInfo = await readTokenDB(accessToken);

    return tokenInfo;
  },

  // validateScope: async () => {},
};

export default oauthModel;
