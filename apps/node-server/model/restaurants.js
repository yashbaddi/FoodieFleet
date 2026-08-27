import { getUpdateExpression } from "../utils.js";
import pool from "./db-connection.js";

const restaurantModel = {
  createRestaurant: createRestaurant,
  readRestaurant: readRestaurant,
  updateRestaurant: updateRestaurant,
  deleteRestaurant: deleteRestaurant,
  readRestaurantLocation,
  readRestaurantOwner,
};

async function createRestaurant(userID, data) {
  const restaurantData = (
    await pool.query(
      "INSERT INTO restaurants(name,description,is_open,location,owner_id) values($1,$2,$3,$4,$5) RETURNING *",
      [
        data.name,
        data.description,
        data.is_open ?? false,
        data.location,
        userID,
      ],
    )
  ).rows[0];

  return restaurantData;
}

async function readRestaurant(filters = {}) {
  if (filters.id) {
    const query =
      "SELECT row_to_json(restaurants) as data FROM restaurants where restaurants.id=$1";

    return (await pool.query(query, [filters.id])).rows[0]?.data;
  }
  if (filters.ownerID) {
    const query =
      "SELECT row_to_json(restaurants) as data FROM restaurants where restaurants.owner_id=$1";

    return (await pool.query(query, [filters.ownerID])).rows;
  }
  if (filters.opened) {
    const query =
      "SELECT row_to_json(restaurants) as data FROM restaurants where is_open=TRUE";
    const rows = await pool.query(query);
    return rows.rows;
  }
  const query = "SELECT row_to_json(restaurants) as data FROM restaurants";

  return (await pool.query(query)).rows;
}

async function readRestaurantOwner(restaurantID) {
  const response = (
    await pool.query("SELECT owner_id from restaurants where id=$1", [
      restaurantID,
    ])
  ).rows[0]?.owner_id;

  if (response) return response;
}

async function readRestaurantLocation(restaurantID) {
  const query =
    "SELECT row_to_json(restaurants) as data FROM restaurants where id=$1";
  const response = (await pool.query(query, [restaurantID])).rows;
  return response[0].data.location;
}

async function updateRestaurant(id, data) {
  const [expression, values] = getUpdateExpression(data);

  const query =
    "UPDATE restaurants SET" +
    expression +
    " WHERE id=$" +
    (values.length + 1) +
    " RETURNING *";

  const updatedData = await pool.query(query, [...values, id]);
  return updatedData.rows[0];
}

async function deleteRestaurant(id) {
  const rowCount = (
    await pool.query("DELETE FROM restaurants WHERE id=$1", [id])
  ).rowCount;

  return rowCount;
}

export default restaurantModel;
