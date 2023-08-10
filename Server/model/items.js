import { getUpdateExpression } from "../utils.js";
import pool from "./db-connection.js";

export async function createItem(restaurantID, data) {
  const itemID = (
    await pool.query(
      "INSERT INTO ITEMS(name,is_vegitarian,description,price,restaurant_ID) VALUES($1,$2,$3,$4,$5)",
      [data.name, data.isVegitarian, data.descriprion, data.price, restaurantID]
    )
  ).rows.id;
  return itemID;
}

export async function readItem(restaurantID, filters = {}) {
  const response = (
    await pool.query("SELECT * FROM ITEMS WHERE restaurant_id=$1", [
      restaurantID,
    ])
  ).rows;
  return response;
}
