import userModel from "../model/users";

const userService = {
  createUser: createUser,
  readUserByID: readUserByID,
};

async function createUser(newUserData) {
  const data = await userModel.createUser(newUserData);
  return data;
}

async function readUserByID(userID) {
  const userData = await userModel.readUser({ id: userID });
  return userData;
}

async function updateUser(userID, updatedUserData) {
  const userData = await userModel.updateUser(userID, updatedUserData);
  return userData;
}
