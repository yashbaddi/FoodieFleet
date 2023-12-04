import { useEffect, useState } from "react";
import {
  createUserSocketConnect,
  getDriverLocationWS,
} from "../services/ws-connection";
import MapComponent from "../components/MapComponent";
import { useParams } from "react-router-dom";
import { getOrder } from "../services/requests";
import OrderDetails from "../components/OrderDetails";
import OrderStatus from "../components/OrderStatus";
import OrderPartnerDetails from "../components/OrderPartnerDetails";

export default function TrackOrder() {
  const [isLoaded, setLoaded] = useState(false);
  const [socket, setSocket] = useState(null);
  const { orderID } = useParams();
  const [orderStatus, setOrderStatus] = useState(null);
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const userSocket = createUserSocketConnect(onNotifications);
    setSocket((socket) => userSocket);
    getOrder(orderID).then((orderDetails) => {
      setOrder(orderDetails);
      console.log({ "isLoadded:": isLoaded, orderDet: orderDetails });
      if (orderDetails.driver) {
        setPartnerDetails(orderDetails.driver);
      }
      setOrderStatus((status) => orderDetails.status);
      setLoaded(true);
      if (
        orderDetails.status === "PARTNER_ASSIGNED" ||
        orderDetails.status === "DELIVERING"
      ) {
        getDriverLocationWS(userSocket, orderDetails.driver_id);
      }
    });
    function onNotifications(notificationData) {
      console.log("Notification Data", notificationData);
      console.log("socket in notifications", userSocket);
      console.log("order in notification", order);
      if (notificationData.status) {
        setOrderStatus(notificationData.status);

        if (
          notificationData.status === "PARTNER_ASSIGNED" ||
          notificationData.status === "DELIVERING"
        ) {
          setPartnerDetails(notificationData.partner);
          getDriverLocationWS(userSocket, notificationData.partner.id);
        }
      }
    }

    return () => {
      userSocket.close();
    };
  }, []);

  console.log("user Socket connect", socket);

  console.log("Orders in Track Page:", order);

  // function onDriverInformation(driverInformation) {
  //   setPartnerDetails(driverInformation.partner);
  // }

  return (
    <div>
      {order && <OrderDetails order={order} />}
      {orderStatus && <OrderStatus status={orderStatus} />}

      {isLoaded && (
        <MapComponent
          userLocation={order.delivery_location}
          restaurantLocation={order.restaurant.location}
        />
      )}
      {partnerDetails && <OrderPartnerDetails partner={partnerDetails} />}
    </div>
  );
}
