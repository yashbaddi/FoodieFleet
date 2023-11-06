const restaurantSockets = [];

export const restaurantWsController = {
  sendOrderDetails,
};

async function sendOrderDetails(restaurantID, order) {
  const payload = {
    type: "order",
    data: order,
  };
  restaurantSockets[restaurantID].send(JSON.stringify(payload));
}
