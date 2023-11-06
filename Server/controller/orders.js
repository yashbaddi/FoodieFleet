import orderService from "../services/orders.js";

const orderController = {
  getOrdersByOrderID,
  createNewOrder,
  patchCurrentOrder,
};

async function getOrdersByOrderID(req, res) {
  const response = await orderService.getOrdersByOrderID(req.params.id);
  res.json(response);
}

async function createNewOrder(req, res) {
  const response = await orderService.createNewOrder(
    res.locals.userID,
    req.body.restaurantID,
    req.body.location
  );
  console.log(response);
  res.json(response);
}

async function patchCurrentOrder(req, res) {
  if (req.body.item) {
    const response = await orderService.updateItemsInOrder(
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
