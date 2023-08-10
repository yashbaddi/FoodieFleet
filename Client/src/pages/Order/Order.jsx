import { useEffect, useState } from "react";
import { orderID } from "../../Data/sampleData";
import OrderContainer from "./OrderContainers";
import { createOrder, readOrder } from "../../services/requests";

export default function Order() {
  const [ordersData, setOrderData] = useState([]);
  console.log("Ordered Data", ordersData);

  useEffect(() => {
    readOrder(orderID).then((data) => setOrderData(data));
  }, []);
  return (
    <>
      <h1>Orders</h1>
      {ordersData.map((orderedItem, index) => {
        return (
          <OrderContainer
            key={index}
            item={orderedItem.items}
            quantity={orderedItem.quantity}
          />
        );
      })}
    </>
  );
}
