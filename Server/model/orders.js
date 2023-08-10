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

export async function readOrder(filters = {}) {
  if (filters.id) {
    console.log(filters.id);
    const orderDetails = (
      await pool.query(
        "SELECT row_to_json(orders) as order from orders where id=$1",
        [filters.id]
      )
    ).rows[0].order;

    const itemsDetails = (
      await pool.query(
        `SELECT row_to_json(items) as item ,quantity FROM ordered_items 
      JOIN Items ON ordered_items.Item_ID= items.id where order_id=$1`,
        [filters.id]
      )
    ).rows;

    return {
      order: orderDetails,
      items: itemsDetails,
    };
  }
}

export async function updateOrder(id, data) {
  if (!data.item) {
    const [expression, values] = getUpdateExpression(data);
    console.log(values);

    const query =
      "UPDATE orders SET" +
      expression +
      " WHERE id=$" +
      (values.length + 1) +
      " RETURNING *";
    console.log(query);
    const updatedData = await pool.query(query, [...values, id]);
    return {
      orderID: id,
      data: updatedData,
    };
  }
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
