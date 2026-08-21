import React from "react";
import OrderContainerCurrentOrder from "./OrderContainerCurrentOrder";

function CurrentOrders({ orders }) {
  return (
    <div className="my-4 border rounded-xl p-4 lg:p-8 self-stretch ">
      <h1 className="text-xl font-semibold text-gray-700 m-4">
        Current Orders
      </h1>
      <div className="flex flex-col space-y-4">
        {orders.map((order) => (
          <OrderContainerCurrentOrder key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default CurrentOrders;
