import React from "react";

function OrderDetails({ order }) {
  return (
    <div>
      <h1 className="font-bold text-xl">{order.restaurant.name}</h1>
    </div>
  );
}

export default OrderDetails;
