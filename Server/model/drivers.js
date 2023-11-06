import { redisClient } from "./db-connection.js";
import pool from "./db-connection.js";

const driversModel = {
  updateMemberLocation,
  readMemberLocation,
};

async function updateMemberLocation(memberID, location) {
  console.log("memberID:", memberID, "drivero:", location);
  const res = await redisClient.geoAdd("driverLocations", [
    {
      longitude: location.longitude,
      latitude: location.latitude,
      member: memberID,
    },
  ]);
  console.log(res);

  return JSON.parse(res);
}

async function readMemberLocation(memberID) {
  const res = await redisClient.geoPos("driverLocations", memberID);
  return res[0];
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
