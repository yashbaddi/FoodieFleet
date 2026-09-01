import express from "express";
import bodyParser from "body-parser";

import cartCorntroller from "../controller/cart.js";
import { authMiddleware } from "../middlewares/auth.js";

const cartRouter = express.Router();

/**
 * @openapi
 * /cart:
 *   get:
 *     summary: Fetch active user cart
 *     tags:
 *       - Cart
 *     description: Retrieve all items currently in the logged-in user's shopping cart.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       itemId:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *       401:
 *         description: Unauthorized.
 *   put:
 *     summary: Update active user cart
 *     tags:
 *       - Cart
 *     description: Update items or quantities in the user's shopping cart.
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - itemId
 *                     - quantity
 *                   properties:
 *                     itemId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Cart updated successfully.
 *       400:
 *         description: Invalid cart payload.
 *       401:
 *         description: Unauthorized.
 */
cartRouter
  .route("/")
  .get(authMiddleware, cartCorntroller.readCart)
  .put(authMiddleware, bodyParser.json(), cartCorntroller.updateCart);

export default cartRouter;
