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
    res.locals.userID,
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
