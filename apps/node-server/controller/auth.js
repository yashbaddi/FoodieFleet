import userService from "../services/users.js";
import { comparePassword, generateJWTToken } from "../utils.js";

const authController = {
  login,
  register,
  logout,
  me,
};

async function login(req, res) {
  try {
    console.log("inside auth controller");
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userService.findUserByEmail(email);
    if (!user || !user.password_hash) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateJWTToken(user);

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function register(req, res) {
  try {
    const { name, phone, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const user = await userService.registerUser({
      name,
      phone: phone || "",
      email,
      password,
    });

    const token = generateJWTToken(user);

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res
      .status(400)
      .json({ message: error.message || "Registration failed" });
  }
}

async function logout(req, res) {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
}

async function me(req, res) {
  try {
    const userID = res.locals.userID;
    if (!userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await userService.readUserByID(userID);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(202).json({ user });
  } catch (error) {
    console.error("Fetch current user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default authController;
