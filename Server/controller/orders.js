import {
  patchOrder,
  readOrder,
  createOrder,
  updateQuantity,
  deleteItemFromOrder,
} from "../model/orders.js";

export default {
  getOrdersByOrderID: getOrdersByOrderID,
  createNewOrder: createNewOrder,
  patchCurrentOrder: patchCurrentOrder,
};

async function getOrdersByOrderID(req, res) {
  res.json(await readOrder({ id: req.params.id }));
}

async function createNewOrder(req, res) {
  const response = await createOrder("8968071c-4f3d-4fb9-87f8-4f2ccba4c318", {
    restaurantID: req.body.restaurantID,
  });
  res.json(response);
}

async function patchCurrentOrder(req, res) {
  if (req.body.item) {
    if (req.body.item.quantity > 0) {
      const updateResponse = await updateQuantity(
        req.params.id,
        req.body.item.id,
        req.body.item.quantity
      );

      res.json(updateResponse);
    }

    if (req.body.item.quantity <= 0) {
      const deleteResponse = await deleteItemFromOrder(
        req.params.id,
        req.body.item.id
      );

      res.json(deleteResponse);
    }
  }

  if (!req.body.item) {
    const response = await patchOrder(req.params.id, req.body);
    res.json(response);
  }
}
