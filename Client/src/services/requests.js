const baseURL = "http://127.0.0.1:3000/";

//Restaurants

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

export async function createRestaurant(data) {
  console.log("in request", data);
  const path = "restaurants/";
  const response = await fetch(baseURL + path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json;
}

export async function updateRestaurant(id, data) {
  const path = "restaurants/" + id;
  const response = await fetch(baseURL + path, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteRestaurant(id) {
  const path = "restaurants/" + id;
  const response = await fetch(baseURL + path, {
    method: "DELETE",
  });
  return response.json();
}

//Items
export async function getRestaurantMenu(id) {
  const path = "restaurants/" + id + "/items/";
  const response = await fetch(baseURL + path, {
    method: "GET",
  });
  return response.json();
}

export async function createItem(restaurantsID, data) {
  const path = "restaurants/" + restaurantsID + "/items/";
  const response = await fetch(baseURL + path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updateItem(restaurantsID, itemID, data) {
  const path = "restaurants/" + restaurantsID + "/items/" + itemID;
  const response = await fetch(baseURL + path, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteItem(restaurantsID, itemID) {
  const path = "restaurants/" + restaurantsID + "/items/" + itemID;
  const response = await fetch(baseURL + path, {
    method: "DELETE",
  });
  return response.json();
}

//Orders
export async function createOrder(restaurantID) {
  const path = "orders/";
  const response = await fetch(baseURL + path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      restaurantID: restaurantID,
    }),
  });
  return response.json();
}

export async function addItemToOrder(orderID, itemID) {
  const path = "orders/" + orderID;
  const response = await fetch(baseURL + path, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      item: {
        id: itemID,
        action: "add_item",
      },
    }),
  });
  return response.json();
}

export async function removeItemFromOrder(orderID, itemID) {
  const path = "orders/" + orderID;
  const response = await fetch(baseURL + path, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      item: {
        id: itemID,
        action: "remove_item",
      },
    }),
  });
  return response.json();
}

export async function readOrder(orderID) {
  const path = "orders/" + orderID;
  const response = await fetch(baseURL + path, {
    method: "GET",
  });
  console.log(response.json);
  return response.json();
}
