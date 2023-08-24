import userService from "../services/users";

const userController = {
  createUser: createUser,
  readUser: readUser,
};

async function createUser(req, res) {
  const response = userService.createUser(res.body);
  res.json(response);
}

async function readUser(req, res) {
  const response = userService.readUserByID(req.params.id);
  res.json(response);
}
