import driversService from "../services/drivers.js";

export const driverController = {
  getDriverDetails,
  updateDriverStatus,
};

async function getDriverDetails(req, res) {
  const response = await driversService.getDriverStatus(res.locals.userID);
  res.json(response);
}

async function updateDriverStatus(req, res) {
  const response = await driversService.updateDriverStatus(
    res.locals.userID,
    req.query.status
  );
  res.json(response);
}
