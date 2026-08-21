import driverWsController from "../controller/ws/driver.js";
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
  const res = await redisClient.geoadd(
    "driverLocations",
    location.longitude,
    location.latitude,
    memberID
  );

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
  const response = await pool.query(
    `SELECT * FROM drivers WHERE status='AVAILABLE'`
  );
  const availableDrivers = response.rows.map((row) => row.user_id);
  const res = await redisClient.georadius(
    "driverLocations",
    location.longitude,
    location.latitude,
    distance,
    "m"
  );
  const activeDrivers = await driverWsController.getAllActiveDrivers();
  const filteredDrivers = availableDrivers.filter(
    (driver) => res.includes(driver) && activeDrivers.includes(driver)
  );
  return filteredDrivers;
}
export default driversModel;
