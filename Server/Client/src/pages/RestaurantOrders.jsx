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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-gray-700">
        {" "}
        Restaurant Orders
      </h1>
      {unapprovedOrders.length !== 0 && (
        <OrdersNeededApproval
          orders={unapprovedOrders}
          ws={socket}
          updateOrderList={updateOrderList}
        />
      )}
      {currentOrders.length !== 0 && <CurrentOrders orders={currentOrders} />}
      {previousOrders.length !== 0 && (
        <PreviousOrders orders={previousOrders} />
      )}
    </div>
  );
}

export default RestaurantOrders;
