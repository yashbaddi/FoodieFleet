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

  return (
    <div>
      <div className="flex justify-between">
        <div className="shadow-xl m-8 p-4 text-gray-700 w-fit rounded-2xl border-2 ">
          {order && <OrderDetails order={order} />}
          {orderStatus && <OrderStatus status={orderStatus} />}
        </div>
        {partnerDetails && <OrderPartnerDetails partner={partnerDetails} />}
      </div>

      {isLoaded && (
        <MapComponent
          userLocation={order.delivery_location}
          restaurantLocation={order.restaurant.location}
        />
      )}
    </div>
  );
}
