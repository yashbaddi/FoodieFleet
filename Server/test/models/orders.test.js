import driversService from "../../services/drivers.js";
import orderService from "../../services/orders.js";
import orderModel from "../../model/orders.js";

// createOrder(res.locals.userID, {
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

// const data = await updateOrder("fee34d53-2da6-4f96-8549-72cd8efb25bc", {
//   item: {
//     action: "add_item",
//     id: "11ba60f7-f2da-49c0-b10a-43ed2e94268b",
//   },
// });

// const data = await updateOrder("fee34d53-2da6-4f96-8549-72cd8efb25bc", {
//   item: {
//     action: "remove_item",
//     id: "11ba60f7-f2da-49c0-b10a-43ed2e94268b",
//   },
// });

// const driv = await driversService.updateDriverLocation(
//   "gagan",
//   12.9351088,
//   77.6157508
// );

// const data = await orderService.createNewOrder(
//   "yashbaddi",
//   "dd7ee8dd-87c4-42ac-8270-f382b770f4cc",
//   {
//     latitude: 12.9615365,
//     longitude: 77.6441559,
//   }
// );
// console.log("data:", data);

// console.log(JSON.stringify(data, null, 4));

console.dir(
  await orderModel.readOrders({
    id: "621ea03a-cee6-4ec8-a325-b0119d7a1787",
  }),
  { depth: null }
);
