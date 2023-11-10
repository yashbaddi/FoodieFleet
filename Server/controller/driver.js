import driversService from "../services/drivers";

export const driverController = {
  getDriverDetails,
};

async function getDriverDetails(req, res) {
  const response = await driversService.getDriverStatus(res.locals.userID);
  res.json(response);
}
