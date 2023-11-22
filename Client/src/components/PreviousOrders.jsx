import React from "react";
import OrderContainer from "./OrderContainer";

function PreviousOrders({ orders }) {
  return (
    <div>
      <h1>Previous Orders</h1>
      {orders.map((order) => {
        return <OrderContainer key={order.id} order={order} />;
      })}
    </div>
  );
}

export default PreviousOrders;
