import { redisClient } from "./db-connection.js";
import pool from "./db-connection.js";

const driversModel = {
  updateMemberLocation,
  readMemberLocation,
  updateDriverStatus,
  getDrivers,
  getNearbyMembers,
  setUserToDriver,
};

async function updateMemberLocation(memberID, location) {
  console.log("memberID:", memberID, "drivero:", location);
  const res = await redisClient.geoadd(
    "driverLocations",
    location.longitude,
    location.latitude,
    memberID
  );
  console.log(res);

  return JSON.parse(res);
}

async function readMemberLocation(memberID) {
  const res = await redisClient.geopos("driverLocations", memberID);
  return res[0];
}

async function updateDriverStatus(driverID, status) {
  return (
    await pool.query("UPDATE TABLE drivers SET status=$2 where user_id=$1", [
      driverID,
      status,
    ])
  ).rows;
}

async function getDrivers(filters = {}) {
  if (filters.id)
    return (
      await pool.query("SELECT * FROM drivers where user_id=$1", [filters.id])
    ).rows;
  if (filters.status)
    return (
      await pool.query("SELECT * FROM drivers where status=$1", [
        filters.status,
      ])
    ).rows;

  return (await pool.query("SELECT * FROM drivers", [filters.status])).rows;
}

async function setUserToDriver(userID) {
  return (
    await pool.query("INSERT INTO drivers(user_id) VALUES($1) RETURNING *", [
      userID,
    ])
  ).rows;
}

async function getNearbyMembers(location, distance) {
  const res = await redisClient.georadius(
    "driverLocations",
    location.longitude,
    location.latitude,
    distance,
    "m"
  );
  console.log(res);
  return res;
}
export default driversModel;
// const data = await updateMemberLocation("harsh", {
//   latitude: 12.9602122,
//   longitude: 77.6447949,
// });

// console.log("in data", await data);

// const suo = await readMemberLocation("harsh");

// console.log("location REade:", await suo);

// const duo = await getNearbyMembers({
//   latitude: 12.9602122,
//   longitude: 77.6447949,
// });
