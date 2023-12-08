import { getUpdateExpression } from "../utils.js";
import pool from "./db-connection.js";

const itemModel = { createItem, readItem, updateItem, deleteItem };

async function createItem(restaurantID, data) {
  const itemData = (
    await pool.query(
      "INSERT INTO items(name,is_vegetarian,description,price,submenu,restaurant_id) values($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        data.name,
        data.isVegetarian,
        data.description,
        data.price,
        data.submenu,
        restaurantID,
      ]
    )
  ).rows[0];
  return itemData;
}

async function readItem(restaurantID, filters = {}) {
  const response = (
    await pool.query("SELECT * FROM ITEMS WHERE restaurant_id=$1", [
      restaurantID,
    ])
  ).rows;
  return response;
}

async function updateItem(itemID, data) {
  const [expression, values] = getUpdateExpression(data);

  const query =
    "UPDATE items SET" +
    expression +
    " WHERE id=$" +
    (values.length + 1) +
    " RETURNING *";

  const updatedData = await pool.query(query, [...values, itemID]);
  return updatedData.rows[0];
}
async function deleteItem(itemID) {
  const rowCount = (await pool.query("DELETE FROM items WHERE id=$1", [itemID]))
    .rowCount;
  return rowCount;
}

export default itemModel;
