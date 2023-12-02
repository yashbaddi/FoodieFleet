import { useEffect, useState } from "react";
import {
  createUserSocketConnect,
  getDriverLocationWS,
} from "../services/ws-connection";
import MapComponent from "../components/MapComponent";
import { useParams } from "react-router-dom";
import { getOrder } from "../services/requests";
import TrackOrderDetail from "../components/TrackOrderDetail";

export default function TrackOrder() {
  const [isLoaded, setLoaded] = useState(false);
  const [socket, setSocket] = useState(null);
  const { orderID } = useParams();
  const [orderStatus, setOrderStatus] = useState(null);
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const userSocket = createUserSocketConnect(onNotifications);
    setSocket(userSocket);
    getOrder(orderID).then((orderDetails) => {
      setOrder(orderDetails);
      console.log({ "isLoadded:": isLoaded, orderDet: orderDetails });
      setOrderStatus((status) => orderDetails.status);
      setLoaded(true);
      if (
        orderDetails.status === "PARTNER_ASSIGNED" ||
        orderDetails.status === "DELIVERING"
      ) {
        getDriverLocationWS(userSocket, orderDetails.driver_id);
      }
    });

    return () => {
      userSocket.close();
    };
  }, []);

  function onNotifications(notificationData) {
    if (notificationData.status) {
      setOrderStatus(notificationData.status);

      if (notificationData.status === "PARTNER_ASSIGNED") {
        setPartnerDetails(notificationData.partner);
        getDriverLocationWS(socket, order.driver_id);
      }
    }
  }

  console.log("Orders in Track Page:", order);

  // function onDriverInformation(driverInformation) {
  //   setPartnerDetails(driverInformation.partner);
  // }

  return (
    <div>
      {order && <TrackOrderDetail order={order} />}
      {isLoaded && (
        <MapComponent
          userLocation={order.delivery_location}
          restaurantLocation={order.restaurant.location}
        />
      )}
    </div>
  );
}
