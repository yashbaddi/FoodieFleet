import { getUpdateExpression } from "../utils.js";
import pool from "./db-connection.js";

export async function createRestaurant(userID, data) {
  console.log(data);
  // const addressID = (
  //   await pool.query(
  //     "INSERT INTO address(address,latitude,longitude,owener_id) VALUES($1,$2,$3)",
  //     [data.address.address, data.address.latitude, data.address.longitude]
  //   )
  // ).rows.id;
  const restaurantData = (
    await pool.query(
      "INSERT INTO restaurants(name,description,timings,owner_id) values($1,$2,$3,$4) RETURNING *",
      [data.name, data.description, data.timings, userID]
    )
  ).rows[0];

  return restaurantData;
}

export async function readRestaurant(filters = {}) {
  if (filters.id) {
    const query =
      "SELECT row_to_json(restaurants) as data FROM restaurants where restaurants.id=$1";

    return (await pool.query(query, [filters.id])).rows;
  }
  const query = "SELECT row_to_json(restaurants) as data FROM restaurants";

  return (await pool.query(query)).rows;
}

export async function updateRestaurant(id, data) {
  const [expression, values] = getUpdateExpression(data);
  console.log(values);

  const query =
    "UPDATE restaurants SET" +
    expression +
    " WHERE id=$" +
    (values.length + 1) +
    " RETURNING *";
  console.log(query);

  const updatedData = await pool.query(query, [...values, id]);
  console.log();
  return updatedData.rows[0];
}

export async function deleteRestaurant(id) {
  const rowCount = (
    await pool.query("DELETE FROM restaurants WHERE id=$1", [id])
  ).rowCount;

  return rowCount;
}
