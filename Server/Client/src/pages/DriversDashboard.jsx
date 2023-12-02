import React, { useEffect, useState } from "react";
import {
  createDriverSocketConnect,
  sendLocationWS,
} from "../services/ws-connection";
import { getDriversDetails } from "../services/requests";
import useGeolocation from "../hooks/useGeoLocation";
import DeliveringOrder from "../components/DeliveringOrder";

function DriversDashboard() {
  const [isAvialable, setAvailablity] = useState(true);
  const [assignedOrder, setAssignedOrder] = useState(null);
  const [driverSocket, setDriverSocket] = useState(null);
  const location = useGeolocation();

  useEffect(() => {
    getDriversDetails().then((data) => {
      console.log("driver details", data[0]);
      if (data[0].status === "BUSY") {
        setAvailablity(false);
      } else {
        setAvailablity(true);
      }
    });
  }, []);

  useEffect(() => {
    console.log("Setup socket");
    const sock = createDriverSocketConnect(addDeliveringOrder);
    setDriverSocket(sock);
    console.log("location Outside", location);
    // updateDriverStatusWS(driverSocket, "AVAILABLE");
    return () => {
      sock.close();
    };
  }, []);

  useEffect(() => {
    console.log(location);
    // const driverInterval = setInterval(() => {
    console.log("isAvailable:", isAvialable);
    if (location.isLoaded && isAvialable) {
      console.log("location", location);
      console.log("location coor", location.coordinates);
      sendLocationWS(driverSocket, location.coordinates);
    }
    // }, 3000);
    return () => {
      // clearInterval(driverInterval);
    };
  }, [location]);

  function changeDriverAvailablity() {
    setAvailablity((isAvialable) => !isAvialable);
  }

  function addDeliveringOrder(order) {
    setAssignedOrder(order);
  }

  return (
    <div>
      <label>Are you available </label>
      <input
        type="checkbox"
        checked={isAvialable}
        onChange={changeDriverAvailablity}
      />
      {assignedOrder && (
        <DeliveringOrder ws={driverSocket} order={assignedOrder} />
      )}
    </div>
  );
}

export default DriversDashboard;
