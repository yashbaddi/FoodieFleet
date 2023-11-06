const restaurantSockets = [];

export const restaurantWsController = {
  sendOrderDetails,
  setRestaurantSocket,
  closeRestaurantSocket,
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

async function closeRestaurantSocket(ws) {
  restaurantSockets[ws.restaurantID] = undefined;
}
