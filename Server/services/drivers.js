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
};

function addDriver(userID) {}

function removeDriver() {}

function updateDriverStatus() {}

function updateDriversLocation(clientID, latitude, longitude) {
  DriversLocations[clientID] = turf.point([latitude, longitude]);
}

function requestAllDriversLocation() {}

function getNearestDriver() {}

export default DriverService;
