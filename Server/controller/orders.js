import orderService from "../services/orders.js";

const orderController = {
  getOrdersByOrderID,
  getOrdersByUserID,
  createNewOrder,
  patchCurrentOrder,
};

async function getOrdersByOrderID(req, res) {
  const response = await orderService.getOrdersByOrderID(req.params.id);
  res.json(response);
}

async function getOrdersByUserID(req, res) {
  if (req.query.owner) {
    const response = await orderService.getOrdersByRestaurantOwener(
      res.locals.userID
    );

    res.json(response);
  } else {
    const response = await orderService.getOrdersByUserID(res.locals.userID);

    res.json(response);
  }
}

async function createNewOrder(req, res) {
  const response = await orderService.createNewOrder(
    res.locals.userID,
    req.body.restaurantID,
    req.body.location
  );
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
