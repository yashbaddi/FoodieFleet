import { useEffect, useState } from "react";
import { orderID } from "../../Data/sampleData";
import OrderContainer from "./OrderContainers";
import { createOrder, readOrder } from "../../services/requests";

export default function Order() {
  const [ordersData, setOrderData] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);
  console.log("Ordered Data", ordersData);
  console.log("Ordered Items", orderedItems);

  useEffect(() => {
    readOrder(orderID).then((data) => {
      setOrderData(data.order);
      setOrderedItems(data.items);
    });
  }, [ordersData, orderedItems]);

  return (
    <>
      <h1>Orders</h1>
      {orderedItems.map((orderedItem, index) => {
        return (
          <OrderContainer
            key={index}
            item={orderedItem.item}
            quantity={orderedItem.quantity}
          />
        );
      })}
    </>
  );
}
