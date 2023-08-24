import userService from "../services/users";

const userController = {
  createUser: createUser,
};

async function createUser(req, res) {
  const response = userService.createUser(res.body);
  res.json(response);
}
