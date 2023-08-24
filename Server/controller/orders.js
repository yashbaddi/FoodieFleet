import {
  patchOrder,
  readOrder,
  createOrder,
  updateQuantity,
  deleteItemFromOrder,
} from "../model/orders.js";

import orderService from "../services/orders.js";

const orderController = {
  getOrdersByOrderID: getOrdersByOrderID,
  createNewOrder: createNewOrder,
  patchCurrentOrder: patchCurrentOrder,
};

async function getOrdersByOrderID(req, res) {
  const response = orderService.getOrdersByOrderID(req.params.id);
  res.json(response);
}

async function createNewOrder(req, res) {
  const response = orderService.createNewOrder(
    "8968071c-4f3d-4fb9-87f8-4f2ccba4c318",
    req.body.restaurantID
  );
  res.json(response);
}

async function patchCurrentOrder(req, res) {
  if (req.body.item) {
    const response = orderService.updateItemsInOrder(
      req.params.id,
      req.body.item
    );
    res.json(response);
  }

  if (!req.body.item) {
    const response = orderService.patchCurrentOrder(req.params.id, req.body);
    res.json(response);
  }
}

export default orderController;
