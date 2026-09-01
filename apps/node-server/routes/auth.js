import express from "express";
import authController from "../controller/auth.js";
import { authMiddleware } from "../middlewares/auth.js";

const authRouter = express.Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     description: Authenticate user using email and password, setting an HTTP-only JWT token cookie upon success.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful. Token cookie set.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *       400:
 *         description: Invalid input or missing credentials.
 *       401:
 *         description: Invalid email or password.
 */
authRouter
  .route("/login")
  .post(authController.login)
  .all((req, res) => {
    res.status(405).json({ message: "Method Not Allowed. Please send a POST request with email and password." });
  });

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: User registration
 *     tags:
 *       - Authentication
 *     description: Register a new user account (customer, restaurant owner, or driver).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "janedoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *               role:
 *                 type: string
 *                 enum: [customer, restaurant_owner, driver]
 *                 default: customer
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Email already registered or invalid fields.
 */
authRouter
  .route("/register")
  .post(authController.register)
  .all((req, res) => {
    res.status(405).json({ message: "Method Not Allowed. Please send a POST request to register." });
  });

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags:
 *       - Authentication
 *     description: Log out current user and clear token authentication cookie.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully.
 */
authRouter
  .route("/logout")
  .post(authController.logout)
  .all((req, res) => {
    res.status(405).json({ message: "Method Not Allowed. Please send a POST request to log out." });
  });

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user details
 *     tags:
 *       - Authentication
 *     description: Fetch details of the currently authenticated user session.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user details.
 *       401:
 *         description: Unauthorized - missing or invalid authentication token.
 */
authRouter.get("/me", authMiddleware, authController.me);

export default authRouter;
