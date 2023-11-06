import driversModel from "../model/drivers.js";

// const DriversLocations = [];
// const AvailableDrivers = new Set();
// const BusyDrivers = new Set();

const driversService = {
  //   addDriver,
  updateDriverLocation,
  getNearestDriver,
  getDriverStatus,
  updateDriverStatus,
  readDriverLocation,
  //   getAllDriversLocation,
};

function updateDriverLocation(userID, latitude, longitude) {
  return driversModel.updateMemberLocation(userID, {
    latitude,
    longitude,
  });
}

function readDriverLocation(driverID) {
  return driversModel.readMemberLocation(driverID);
}

function updateDriverStatus(userID, status) {
  return driversModel.updateDriverStatus(userID, status);
}

async function getDriverStatus(userID) {
  return (await driversModel.getDrivers({ id: userID }))[0].status;
}

// function getAllDriversLocation() {
//   return DriversLocations;
// }

function getNearestDriver(location) {
  return driversModel.getNearbyMembers(location);
}

export default driversService;
