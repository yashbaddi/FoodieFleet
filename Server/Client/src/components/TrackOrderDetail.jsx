import React from "react";
const OrderStatusMessage = {
  PLACED: "Your Order is Placed",
  PREPARING: "Your Order is Preparing!!",
  PARTNER_ASSIGNED: "Driver is assigned",
  DELIVERING: "Your Food is on the way",
  DELIVERED: "Delivered!",
};

function TrackOrderDetail({ order }) {
  return (
    <div>
      <h1 className="font-bold text-xl">{order.restaurant.name}</h1>
      <p>Order Status:{OrderStatusMessage[order.status]}</p>
      {order.driver && (
        <div className=" absolute inline-block z-[401] right-10 bg-white border border-gray-600">
          <h1>Driver Details</h1>
          <h1>{order.driver.name}</h1>
          <p>{order.driver.phone}</p>
        </div>
      )}
    </div>
  );
}

export default TrackOrderDetail;
