import React, { useState } from "react";

function OrderDetails({ order }) {
  const [itemsData, setItemsData] = useState(order.items);
  console.log("itemsData", order);
  return (
    <div className="mb-10 relative">
      <h1 className="font-bold text-xl">{order.restaurant.name}</h1>
      {itemsData.map((itemData) => {
        console.log("itemData", itemData);

        return (
          <div
            key={itemData.item}
            className="flex justify-between text-gray-400"
          >
            <p>
              {itemData.item.name} x {itemData.quantity}
            </p>
            <p>{itemData.quantity * itemData.item.price}</p>
          </div>
        );
      })}
      <p className="text-gray-700 font-semibold absolute right-2 m-1">
        Total: {order.total_amt}
      </p>
    </div>
  );
}

export default OrderDetails;
