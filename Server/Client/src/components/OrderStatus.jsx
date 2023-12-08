import React from "react";

const orderStatusMessage = new Map([
  ["PLACED", "Your Order is Placed"],
  ["PREPARING", "Your Order is Preparing!!"],
  ["PARTNER_ASSIGNED", "Driver is assigned"],
  ["DELIVERING", "Your Food is on the way"],
  ["DELIVERED", "Food is Delivered!"],
  ["REJECTED", "Your Order is Rejected"],
]);

const textColorTailwindClasses = new Map([
  ["DELIVERED", "text-green-800 border-green-800"],
  ["REJECTED", "text-red-800 border-red-800"],
]);

function OrderStatus({ status }) {
  return (
    <div
      className={
        "m-4 p-1 px-2 font-semibold border rounded-2xl" +
        (status === "REJECTED"
          ? "text-red-800 border-red-800"
          : status === "DELIVERED"
          ? "text-green-800 border-green-800"
          : " text-orange-600 border-orange-600")
      }
    >
      {orderStatusMessage.get(status)}
    </div>
  );
}

export default OrderStatus;
