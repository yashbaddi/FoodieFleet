import driversModel from "../../model/drivers.js";
import driversService from "../../services/drivers.js";

// driversService.updateDriverLocation("gagan", 12.9335207, 77.6204045);

driversModel.getNearbyMembers(
  { latitude: 12.9607019, longitude: 77.6432458 },
  200
);
