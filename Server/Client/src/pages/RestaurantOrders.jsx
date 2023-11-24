import React, { useEffect, useState } from "react";
import OrdersNeededApproval from "../components/OrdersNeededApproval";
import { createRestaurantSocketConnect } from "../services/ws-connection";
import { getAllOrdersByOwner } from "../services/requests";
import CurrentOrders from "../components/CurrentOrders";
import PreviousOrders from "../components/PreviousOrders";

function RestaurantOrders() {
  const [socket, setSocket] = useState(null);
  const [unapprovedOrders, setUnapprovedOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    getAllOrdersByOwner().then((orders) => {
      const unapproved = orders.filter((order) => order.status === "PLACED");
      const curr = orders.filter(
        (order) => order.status !== "DELIVERED" && order.status !== "PLACED"
      );
      const prev = orders.filter((order) => order.status === "DELIVERED");
      setUnapprovedOrders(unapproved);
      setCurrentOrders(curr);
      setPreviousOrders(prev);
    });
  }, []);

  useEffect(() => {
    const restaurantSocket = createRestaurantSocketConnect(
      addUnApprovedOrders,
      getNotifications
    );
    setSocket(restaurantSocket);
    return () => {
      restaurantSocket.close();
    };
  }, []);

  function addUnApprovedOrders(order) {
    setUnapprovedOrders((unapprovedOrders) => unapprovedOrders.unshift(order));
  }

  function getNotifications(notification) {}

  function updateOrderList(order) {
    setUnapprovedOrders((unapprovedOrders) =>
      unapprovedOrders.filter(
        (unapprovedOrder) => unapprovedOrder.id !== order.id
      )
    );
    if (order.status === "PREPARING") {
      setCurrentOrders((currentOrders) => currentOrders.push(order));
    }
  }

  return (
    <div>
      <h1>Orders</h1>
      {unapprovedOrders && (
        <OrdersNeededApproval
          orders={unapprovedOrders}
          ws={socket}
          updateOrderList={updateOrderList}
        />
      )}
      {currentOrders && <CurrentOrders orders={currentOrders} />}
      {previousOrders && <PreviousOrders orders={previousOrders} />}
    </div>
  );
}

export default RestaurantOrders;
