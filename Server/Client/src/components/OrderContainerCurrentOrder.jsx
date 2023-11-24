import React from "react";
import OrderContainer from "./OrderContainer";
import { Link } from "react-router-dom";

function OrderContainerCurrentOrder({ order }) {
  console.log("Current Order in container", order);
  return (
    <div>
      <OrderContainer order={order} />
      <Link to={`/track-order/${order.id}`}>
        <button>Track Order</button>
      </Link>
    </div>
  );
}

export default OrderContainerCurrentOrder;
