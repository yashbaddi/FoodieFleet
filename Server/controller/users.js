import userService from "../services/users";

const userController = {
  createUser: createUser,
  readUser: readUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};

async function createUser(req, res) {
  const response = userService.createUser(res.body);
  res.json(response);
}

async function readUser(req, res) {
  const response = userService.readUserByID(req.params.id);
  res.json(response);
}

async function updateUser(req, res) {
  const response = userService.updateUser(req.params.id, req.body);
  res.json(response);
}

async function deleteUser(req, res) {
  const response = userService.deleteUser(req.params.id);
  res.json(response);
}

export default userController;
