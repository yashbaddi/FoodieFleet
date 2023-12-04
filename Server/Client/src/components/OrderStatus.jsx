import React from "react";
const OrderStatusMessage = {
  PLACED: "Your Order is Placed",
  PREPARING: "Your Order is Preparing!!",
  PARTNER_ASSIGNED: "Driver is assigned",
  DELIVERING: "Your Food is on the way",
  DELIVERED: "Delivered!",
};

function OrderStatus({ status }) {
  return <div>Order Status:{OrderStatusMessage[status]}</div>;
}

export default OrderStatus;
