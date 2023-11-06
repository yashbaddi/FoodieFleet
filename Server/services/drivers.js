import turf from "@turf/turf";

const DriversLocations = {};
const AvailableDrivers = [];
const BusyDrivers = [];

const DriverService = {
  addDriver,
  removeDriver,
  updateDriverStatus,
  updateDriversLocation,
  getNearestDriver,
  getDriverStatus,
  getAllDriversLocation,
};

function addDriver(userID) {
  AvailableDrivers.push({
    userID: userID,
    status: "Available",
  });
}

function removeDriver() {}

function updateDriverStatus() {}

function updateDriversLocation(clientID, latitude, longitude) {
  DriversLocations[clientID] = turf.point([latitude, longitude]);
}

function getDriverStatus(clientID) {
  return DriversLocations[clientID];
}

function getAllDriversLocation() {
  return DriversLocations;
}

function getNearestDriver() {}

export default DriverService;