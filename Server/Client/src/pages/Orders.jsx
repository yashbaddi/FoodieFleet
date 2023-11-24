import React, { useEffect, useState } from "react";
import { getAllOrdersByUser } from "../services/requests";
import CurrentOrders from "../components/CurrentOrders";
import PreviousOrders from "../components/PreviousOrders";

function Orders() {
  const [currentOrders, setCurrentOrders] = useState(null);
  const [previousOrders, setPreviousOrders] = useState(null);

  useEffect(() => {
    getAllOrdersByUser().then((orders) => {
      const curr = orders.filter((order) => order.status !== "DELIVERED");
      const prev = orders.filter((order) => order.status === "DELIVERED");

      setCurrentOrders(curr);
      setPreviousOrders(prev);
    });
  }, []);
  return (
    <div>
      {currentOrders && <CurrentOrders orders={currentOrders} />}
      {previousOrders && <PreviousOrders orders={previousOrders} />}
      {!currentOrders && !previousOrders && <p>You do not have any orders</p>}
    </div>
  );
}
export default Orders;
