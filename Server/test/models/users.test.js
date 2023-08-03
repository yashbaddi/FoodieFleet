import { readUser, deleteUser, createUser } from "../../model/users.js";

createUser({
  password: "hello123",
  name: "yash",
  email: "yashbaddi29@gmail.com",
  phone: "1234567890",
});
