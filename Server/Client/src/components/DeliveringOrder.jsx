import React from "react";
import {
  setOrderToDeliveredWS,
  setOrderToDeliveringWS,
} from "../services/ws-connection";

function DeliveringOrder({ ws, order }) {
  function sendOrderPickedNotification() {
    setOrderToDeliveringWS(ws, order.id);
  }
  function sendOrderDeliveredNotification() {
    setOrderToDeliveredWS(ws, order.id);
  }
  return (
    <div>
      <p>Order Restaurant:{order.restaurant.name}</p>
      <p>location latitude:{order.restaurant.name}</p>
      <p>location longitude{order.restaurant.name}</p>
      {order.status === "PARTNER_ASSIGNED" && (
        <button
          onClick={sendOrderPickedNotification}
          className="bg-orange-600 text-orange-100 hover:bg-orange-800 rounded p-2 m-2 w-56"
        >
          Order Picked
        </button>
      )}
      {order.status === "DELIVERING" && (
        <button
          onClick={sendOrderDeliveredNotification}
          className="bg-green-600 text-green-100 hover:bg-green-800 rounded p-2 m-2 w-56"
        >
          Delivered
        </button>
      )}
    </div>
  );
}

export default DeliveringOrder;
