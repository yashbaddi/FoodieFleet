import React from "react";
import OrderContainer from "./OrderContainer";
import { Link } from "react-router-dom";

function OrderContainerCurrentOrder({ order }) {
  return (
    <div className="border rounded-xl shadow flex flex-col items-stretch hover:bg-gray-200 m-2 p-4">
      <OrderContainer order={order} />
      <div className="self-end m-2">
        <Link to={`/track-order/${order.id}`}>
          <button className="bg-gray-800 hover:bg-black text-gray-100 p-1 rounded shadow">
            Track Order
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderContainerCurrentOrder;
