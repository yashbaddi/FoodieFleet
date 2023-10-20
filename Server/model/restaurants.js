import { getTimeInHHMMFormat, getUpdateExpression } from "../utils.js";
import pool from "./db-connection.js";
import orderModel from "./orders.js";

const restaurantModel = {
  createRestaurant: createRestaurant,
  readRestaurant: readRestaurant,
  updateRestaurant: updateRestaurant,
  deleteRestaurant: deleteRestaurant,
};

async function createRestaurant(userID, data) {
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

async function readRestaurant(filters = {}) {
  if (filters.id) {
    const query =
      "SELECT row_to_json(restaurants) as data FROM restaurants where restaurants.id=$1";

    return (await pool.query(query, [filters.id])).rows;
  }
  if (filters.ownerID) {
    const query =
      "SELECT row_to_json(restaurants) as data FROM restaurants where restaurants.owner_id=$1";

    return (await pool.query(query, [filters.ownerID])).rows;
  }
  if (filters.opened) {
    const time = Number(getTimeInHHMMFormat());
    const query =
      "SELECT row_to_json(restaurants) as data FROM restaurants where ('Open_timings'<=$1 AND 'Close_timings'>=$1 AND 'Override_timings' != 'closed') OR 'Override_timings'='open'";
    return (await pool.query(query, [time])).rows;
  }
  const query = "SELECT row_to_json(restaurants) as data FROM restaurants";

  return (await pool.query(query)).rows;
}

async function updateRestaurant(id, data) {
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

async function deleteRestaurant(id) {
  const rowCount = (
    await pool.query("DELETE FROM restaurants WHERE id=$1", [id])
  ).rowCount;

  return rowCount;
}

export default restaurantModel;
