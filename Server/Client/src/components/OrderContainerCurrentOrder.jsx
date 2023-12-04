import React from "react";
import OrderContainer from "./OrderContainer";
import { Link } from "react-router-dom";

function OrderContainerCurrentOrder({ order }) {
  return (
    <div className="border rounded-xl flex flex-col items-stretch">
      <OrderContainer order={order} />
      <div className="self-end m-2">
        <Link to={`/track-order/${order.id}`}>
          <button className="bg-gray-400 hover:bg-gray-800 text-gray-100 p-1 rounded shadow">
            Track Order
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderContainerCurrentOrder;
