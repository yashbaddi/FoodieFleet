import React from "react";

function OrderContainer({ order }) {
  return (
    <div>
      {order.items.map((item) => {
        return (
          <div key={item.item.id}>
            <p>
              {item.item.name}x{item.quantity}---
              {item.item.price * item.quantity}
            </p>
          </div>
        );
      })}
      <b>Total:{order.total_amt}</b>
    </div>
  );
}

export default OrderContainer;
