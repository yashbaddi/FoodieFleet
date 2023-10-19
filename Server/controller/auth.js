import config from "../config.js";
import { generateAuthTokenForm, generateAuthUrl } from "../utils.js";

const authController = {
  authorize: authorize,
};

async function authorize(req, res) {
  res.redirect(generateAuthUrl());
}

export default authController;
