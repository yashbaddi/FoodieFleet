import { getUpdateExpression } from "../utils.js";
import pool from "./db-connection.js";

export async function createRestaurant(userID, data) {
  const addressID = (
    await pool.query(
      "INSERT INTO address(address,latitude,longitude) VALUES($1,$2,$3)",
      [data.address.address, data.address.latitude, data.address.longitude]
    )
  ).rows.id;
  const restaurantID = (
    await pool.query(
      "INSERT INTO restaurants(name,description,timings,address_id,owner_id) values($1,$2,$3,$4,$5)",
      [data.name, data.description, data.timings, addressID, userID]
    )
  ).rows.id;

  return restaurantID;
}

export async function readRestaurant(filters = {}) {
  if (filters.id) {
    const query =
      "SELECT row_to_json(restaurants) as data FROM restaurants LEFT JOIN address ON restaurants.address_id = address.id where restaurants.id=$1";

    return (await pool.query(query, [filters.id])).rows;
  }
  const query =
    "SELECT row_to_json(restaurants) as data FROM restaurants LEFT JOIN address ON restaurants.address_id = address.id";

  return (await pool.query(query)).rows;
}
