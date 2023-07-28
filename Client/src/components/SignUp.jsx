/* eslint-disable no-unused-vars */
import { useState } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

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
      Name:
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      Phone:
      <input
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      ></input>
      Email:
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <button onClick={loginHandler}>Login</button>
    </>
  );
}
