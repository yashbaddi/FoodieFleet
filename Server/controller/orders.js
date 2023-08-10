import { updateOrder, readOrder, createOrder } from "../model/orders.js";

export async function getOrdersByOrderID(req, res) {
  res.json(await readOrder({ id: req.params.id }));
}
