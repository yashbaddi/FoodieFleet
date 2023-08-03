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
  const query = "SELECT (id,name,description,) FROM restaurants";
}
