import React from "react";

function OrderContainer({ order }) {
  return (
    <div>
      {order.items.map((item) => {
        return (
          <div
            key={item.item.id}
            className="flex justify-between w-96 m-2 p-2 "
          >
            <p className="">
              {item.item.name} x{item.quantity}
            </p>
            <p>{item.item.price * item.quantity}</p>
          </div>
        );
      })}
      <b>Total:{order.total_amt}</b>
    </div>
  );
}

export default OrderContainer;
