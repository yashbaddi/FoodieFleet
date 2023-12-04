import React from "react";
import OrderContainer from "./OrderContainer";

function PreviousOrders({ orders }) {
  return (
    <div className="my-4 border rounded p-4 self-stretch">
      <h1 className="text-xl font-semibold text-gray-700">Previous Orders</h1>
      <div className="flex flex-col space-y-4">
        {orders.map((order) => {
          return <OrderContainer key={order.id} order={order} />;
        })}
      </div>
    </div>
  );
}

export default PreviousOrders;
