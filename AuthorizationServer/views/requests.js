import config from "../config.js";
import { getSearchParamString } from "./store/queryParams.js";

const serverURL = `${config.host}:${config.port}`;

export async function loginRequest(username, password) {
  const path = "/session/";
  console.log("session Data:", { username, password });
  const res = await fetch(serverURL + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const message = res.json();
  return [res.ok, message];
}

export async function logoutRequest() {
  const path = "/session/";
  const res = await fetch(serverURL + path, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const message = res.json();
  return [res.ok, message];
}

export async function signupRequest(name, username, email, data, password) {
  const path = "/users/";
  const res = await fetch(serverURL + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      username: username,
      email: email,
      data: data,
      password: password,
    }),
  });
  const message = res.json();

  return [res.ok, message];
}

export async function isLoggedIn() {
  const path = "/session";
  const res = await fetch(serverURL + path, {
    method: "GET",
    credentials: "include",
  });
  const message = await res.json();
  console.log(res.ok, message);
  return [res.ok, message.data];
}

export async function generateClientCredentialsRequest(
  applicationName,
  redirectURI,
  grantType,
  scope
) {
  const path = "/client/";
  const res = await fetch(serverURL + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: applicationName,
      redirectUri: redirectURI,
      grants: grantType,
      scope: scope,
    }),
  });
  const credentials = await res.json();
  console.log(res.ok, credentials);
  return [res.ok, credentials];
}

export async function approveRequest() {
  const path = "/oauth/approve" + getSearchParamString();
  // const res = await fetch(serverURL + path, {
  //   method: "POST",
  //   redirect: "follow",
  // });
  // console.log(res);
  // window.location.replace(res.url);
  window.location.href = serverURL + path;
}

export async function rejectRequest() {
  const path = "/oauth/denied";
  const res = await fetch(serverURL + path, {
    method: "POST",
  });
  const credentials = await res.json();
  console.log(res.ok, credentials);
  return [res.ok, credentials];
}
