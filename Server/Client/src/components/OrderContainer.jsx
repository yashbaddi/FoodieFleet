import React from "react";

function OrderContainer({ order }) {
  return (
    <div className="flex flex-col">
      <p className="font-bold">{order.restaurant.name}</p>

      {order.items.map((item) => {
        return (
          <div key={item.item.id} className="flex justify-between w-96 m-1">
            <p className="">
              {item.item.name} x{item.quantity}
            </p>
            <p>{item.item.price * item.quantity}</p>
          </div>
        );
      })}
      <p className="font-bold self-end m-2">Total:{order.total_amt}</p>
    </div>
  );
}

export default OrderContainer;
