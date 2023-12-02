import React from "react";
import OrderContainer from "./OrderContainer";
import { approveOrderWS, rejectOrderWS } from "../services/ws-connection";

function OrderContainerApproval({ order, ws, updateOrderList }) {
  console.log("order in approval container", order);
  function approveOrder() {
    approveOrderWS(ws, order.id);
    updateOrderList(order);
  }
  function rejectOrder() {
    rejectOrderWS(ws, order.id);
    updateOrderList(order);
  }
  return (
    <div className="m-5 p-1 shadow-xl border-1 ">
      <OrderContainer order={order} />
      <div className="m-2 p-2 flex justify-stretch">
        <button
          onClick={approveOrder}
          className="bg-green-700 hover:bg-green-900 rounded-2xl p-4 m-2 text-red-50 shadow"
        >
          Approve Order
        </button>
        <button
          onClick={rejectOrder}
          className="bg-red-600 hover:bg-red-900 rounded-2xl p-4 m-2 text-red-50 shadow"
        >
          Reject Order
        </button>
      </div>
    </div>
  );
}

export default OrderContainerApproval;
