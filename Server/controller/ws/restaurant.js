const restaurantSockets = [];

export const restaurantWsController = {
  sendOrderDetails,
  setRestaurantSocket,
};

async function sendOrderDetails(restaurantID, order) {
  const payload = {
    type: "order",
    data: order,
  };
  restaurantSockets[restaurantID].send(JSON.stringify(payload));
}

async function setRestaurantSocket(ws) {
  restaurantSockets[ws.restaurantID] = ws;
}
