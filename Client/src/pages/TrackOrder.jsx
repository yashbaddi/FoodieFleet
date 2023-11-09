import { useEffect, useState } from "react";
import { createUserSocketConnect } from "../services/ws-connection";
import MapComponent from "../components/MapComponent";
import { useParams } from "react-router-dom";
import { getOrder } from "../services/requests";

export default function TrackOrder() {
  const [isLoaded, setLoaded] = useState(false);
  const { orderID } = useParams();
  const [order, setOrder] = useState({});

  const userSocket = createUserSocketConnect();

  useEffect(() => {
    getOrder(orderID).then((orderDetails) => {
      setOrder(orderDetails);
      console.log({ "isLoadded:": isLoaded, orderDet: orderDetails });
      setLoaded(true);
    });
    return () => {
      userSocket.close();
    };
  }, []);

  return (
    <div>
      orderDetails
      {isLoaded && (
        <MapComponent
          userLocation={order.delivery_location}
          restaurantLocation={order.restaurant.location}
        />
      )}
    </div>
  );
}
