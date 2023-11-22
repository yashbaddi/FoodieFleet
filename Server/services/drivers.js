import userWsController from "../controller/ws/user.js";
import driversModel from "../model/drivers.js";
import orderModel from "../model/orders.js";
import orderService from "./orders.js";

// const DriversLocations = [];
// const AvailableDrivers = new Set();
// const BusyDrivers = new Set();

const driversService = {
  //   addDriver,
  updateDriverLocation,
  setDriverToBusy,
  setDriverToAvailable,
  getNearestDriver,
  getDriverStatus,
  updateDriverStatus,
  readDriverLocation,
  getDriverDetails,
  sendDriversLocationInInterval,
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
function setDriverToBusy(userID) {
  return driversModel.updateDriverStatus(userID, "BUSY");
}

function setDriverToAvailable(userID) {
  return driversModel.updateDriverStatus(userID, "AVAILABLE");
}

async function getDriverStatus(userID) {
  return (await driversModel.getDrivers({ id: userID }))[0].status;
}

async function getDriverDetails(userID) {
  return await driversModel.getDrivers({ id: userID });
}

// function getAllDriversLocation() {
//   return DriversLocations;
// }

function getNearestDriver(location) {
  const drivers = [];
  let distance = 100;
  while (!drivers) {
    drivers = driversModel.getNearbyMembers(location);
    distance += 100;
    if (distance >= 2000) {
      break;
    }
  }
  return drivers[0];
}

function sendDriversLocationInInterval(userID, driverID) {
  setInterval(async () => {
    const location = await driversService.readDriverLocation(driverID);
    userWsController.sendDriverLocation(userID, location);
  }, 5000);
}

export default driversService;
