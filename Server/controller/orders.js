import { updateOrder, readOrder, createOrder } from "../model/orders.js";

export async function getOrdersByOrderID(req, res) {
  res.json(await readOrder({ id: req.params.id }));
}

export async function createEmptyOrder(req, res) {
  const response = await createOrder("8968071c-4f3d-4fb9-87f8-4f2ccba4c318", {
    restaurantID: req.body.restaurantID,
  });
  res.json(response);
}

export async function updateCurrentOrder(req, res) {
  const response = await updateOrder(req.params.id, req.body);
  res.json(response);
}
