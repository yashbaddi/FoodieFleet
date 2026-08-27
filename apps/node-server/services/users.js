import userModel from "../model/users.js";
import { hashPassword, comparePassword } from "../utils.js";

const userService = {
  createUserIfNotExists: createUserIfNotExisits,
  registerUser: registerUser,
  findUserByEmail: findUserByEmail,
  readUserByID: readUserByID,
  updateUser: updateUser,
  deleteUser: deleteUser,
};

async function createUserIfNotExisits(newUserData) {
  const data = await userModel.createUserIfNotExists(newUserData);
  return data;
}

async function registerUser({ name, phone, email, password }) {
  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const passwordHash = await hashPassword(password);
  const newUser = await userModel.createUserWithPassword({
    name,
    phone,
    email,
    passwordHash,
  });
  return newUser;
}

async function findUserByEmail(email) {
  return await userModel.findUserByEmail(email);
}

async function readUserByID(userID) {
  const userData = await userModel.readUser({ id: userID });
  return userData ? userData[0] : null;
}

async function updateUser(userID, updatedUserData) {
  const userData = await userModel.updateUser(userID, updatedUserData);
  return userData;
}

async function deleteUser(userID) {
  const userData = await userModel.deleteUser({ id: userID });
  return userData;
}

export default userService;
