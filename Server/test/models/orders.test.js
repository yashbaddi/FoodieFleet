import { createOrder, readOrder, updateOrder } from "../../model/orders.js";

// createOrder("8968071c-4f3d-4fb9-87f8-4f2ccba4c318", {
//   restaurantID: "b424d354-f611-442e-b384-f80d8597d766",
// });

// createOrderedItem("fee34d53-2da6-4f96-8549-72cd8efb25bc", {
//   itemID: "11ba60f7-f2da-49c0-b10a-43ed2e94268b",
// });

// createOrderedItem("fee34d53-2da6-4f96-8549-72cd8efb25bc", {
//   itemID: "8e4c54f3-7eda-4e7e-a742-b3c3c91cd36a",
// });

// const data = await readOrder({ id: "fee34d53-2da6-4f96-8549-72cd8efb25bc" });
// fee34d53-2da6-4f96-8549-72cd8efb25bc sample order id

const data = await updateOrder("fee34d53-2da6-4f96-8549-72cd8efb25bc", {
  item: {
    action: "add_item",
    id: "11ba60f7-f2da-49c0-b10a-43ed2e94268b",
  },
});

// const data = await updateOrder("fee34d53-2da6-4f96-8549-72cd8efb25bc", {
//   item: {
//     action: "remove_item",
//     id: "11ba60f7-f2da-49c0-b10a-43ed2e94268b",
//   },
// });

console.log(JSON.stringify(data, null, 4));
