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
      if (data[0].status === "BUSY") {
        setAvailablity(false);
      } else {
        setAvailablity(true);
      }
    });
  }, []);

  useEffect(() => {
    const sock = createDriverSocketConnect(addDeliveringOrder);
    setDriverSocket(sock);
    return () => {
      sock.close();
    };
  }, []);

  useEffect(() => {
    if (location.isLoaded && isAvialable) {
      sendLocationWS(driverSocket, location.coordinates);
    }
    return () => {};
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
