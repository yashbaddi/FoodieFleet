import React from "react";
import OrderContainerCurrentOrder from "./OrderContainerCurrentOrder";

function CurrentOrders({ orders }) {
  console.log("current Orders", orders);
  return (
    <div>
      <h1>Current Orders</h1>
      {orders.map((order) => (
        <OrderContainerCurrentOrder key={order.id} order={order} />
      ))}
    </div>
  );
}

export default CurrentOrders;
