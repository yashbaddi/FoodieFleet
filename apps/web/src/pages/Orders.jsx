import React, { useEffect, useState } from "react";
import { getAllOrdersByUser } from "../services/requests";
import CurrentOrders from "../components/CurrentOrders";
import PreviousOrders from "../components/PreviousOrders";

function Orders() {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    getAllOrdersByUser().then((orders) => {
      const curr = orders.filter((order) => order.status !== "DELIVERED");
      const prev = orders.filter((order) => order.status === "DELIVERED");

      setCurrentOrders(curr);
      setPreviousOrders(prev);
    });
  }, []);
  return (
    <div className="grid grid-cols-12 justify-items-center content-stretch ">
      <div className="col-start-2 col-end-10 flex flex-col justify-stretch self-stretch">
        <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
        {currentOrders && <CurrentOrders orders={currentOrders} />}
        {previousOrders.length !== 0 && (
          <PreviousOrders orders={previousOrders} />
        )}
        {currentOrders.length !== 0 && previousOrders.length !== 0 && (
          <p>You do not have any orders</p>
        )}
      </div>
    </div>
  );
}
export default Orders;
