import { getUpdateExpression } from "../utils.js";
import pool from "./db-connection.js";

export default {
  createItem: createItem,
  readItem: readItem,
  updateItem: updateItem,
  deleteItem: deleteItem,
};

async function createItem(restaurantID, data) {
  console.log(data);
  const itemData = (
    await pool.query(
      "INSERT INTO ITEMS(name,is_vegetarian,description,price,restaurant_ID) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [data.name, data.isVegetarian, data.description, data.price, restaurantID]
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
  console.log(values);

  const query =
    "UPDATE items SET" +
    expression +
    " WHERE id=$" +
    (values.length + 1) +
    " RETURNING *";

  console.log(query);

  const updatedData = await pool.query(query, [...values, itemID]);
  return updatedData.rows[0];
}
async function deleteItem(itemID) {
  const rowCount = (await pool.query("DELETE FROM items WHERE id=$1", [itemID]))
    .rowCount;
  return rowCount;
}
