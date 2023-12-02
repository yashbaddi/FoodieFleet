import React from "react";
import OrderContainerCurrentOrder from "./OrderContainerCurrentOrder";

function CurrentOrders({ orders }) {
  console.log("current Orders", orders);
  return (
    <div className="my-4 border rounded p-4 self-stretch">
      <h1 className="text-xl font-semibold text-gray-700">Current Orders</h1>
      <div className="flex flex-col space-y-4">
        {orders.map((order) => (
          <OrderContainerCurrentOrder key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default CurrentOrders;
