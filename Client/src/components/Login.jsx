/* eslint-disable no-unused-vars */
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler() {}

  return (
    <>
      Username:
      <input
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>
      Password:
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button onClick={loginHandler}>Login</button>
    </>
  );
}
