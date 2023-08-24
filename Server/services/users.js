import userModel from "../model/users";

const userService = {
  createUser: createUser,
  readUserByID: readUserByID,
  updateUser: updateUser,
  deleteUser: deleteUser,
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

async function deleteUser(userID) {
  const userData = await userModel.deleteUser({ id: userID });
}

export default userService;
