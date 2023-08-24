import userModel from "../model/users";

const userService = {
  createUser: createUser,
};

async function createUser(newUserData) {
  const data = await userModel.createUser(newUserData);
  return data;
}
