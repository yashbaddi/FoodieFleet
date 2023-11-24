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
    <div>
      <OrderContainer order={order} />
      <div>
        <button onClick={approveOrder}>Approve Order</button>
        <button onClick={rejectOrder}>Reject Order</button>
      </div>
    </div>
  );
}

export default OrderContainerApproval;
