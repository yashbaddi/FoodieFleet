import { getUpdateExpression } from "../utils.js";
import pool from "./db-connection.js";

export async function createOrder(userID, data) {
  const orderID = (
    await pool.query(
      "INSERT INTO Orders(customer_id,restaurant_id) values($1,$2) RETURNING ID",
      [userID, data.restaurantID]
    )
  ).rows[0].id;
  return orderID;
}

// export async function createOrderedItem(orderID, data = {}) {
//   await pool.query(
//     "INSERT INTO Ordered_Items(order_id,item_id) VALUES($1,$2)",
//     [orderID, data.itemID]
//   );

//   return { orderID: orderID, itemID: data.itemID };
// }

// export async function readOrderedItems(filters) {
//   if (filters.userID) {
//     return (
//       await pool.query("SELECT * FROM ordered_items where userID=$1", [
//         filters.userID,
//       ])
//     ).rows;
//   }
//   if (filters.orderID) {
//     return (
//       await pool.query("SELßECT * FROM ordered_items where orderID=$1", [
//         filters.orderIDß,
//       ])
//     ).rows;
//   }
// }
