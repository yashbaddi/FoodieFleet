const baseURL = "http://127.0.0.1:3000/";

export async function getAllRestaurants() {
  const path = "restaurants/";
  const response = await fetch(baseURL + path, {
    method: "GET",
  });
  console.log("Get all Restaurant", response);
  return response.json();
}

export async function getRestaurant(id) {
  const path = "restaurants/" + id;
  const response = await fetch(baseURL + path, {
    method: "GET",
  });
  return response.json();
}

export async function getRestaurantMenu(id) {
  const path = "restaurants/" + id + "/items/";
  const response = await fetch(baseURL + path, {
    method: "GET",
  });
  return response.json();
}

export async function createOrder(restaurantID) {
  const path = "orders/";
  const response = await fetch(baseURL + path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      restaurantID: restaurantID,
    },
  });
  return response.json();
}

export async function addItemToOrder(orderID, itemID) {
  const path = "orders/" + orderID;
  const response = await fetch(baseURL + path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: {
      itemID: itemID,
      action: "add_item",
    },
  });
  return response.json();
}
