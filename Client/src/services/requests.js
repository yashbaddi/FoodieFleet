const baseURL = "http://localhost:3000/";

//Restaurants

export async function getAllOpenedRestaurants() {
  const path = "restaurants/?opened=true";
  const response = await fetch(baseURL + path, {
    method: "GET",
    credentials: "include",
  });
  isAuthenticated(response);
  console.log("Get all Restaurant", response);
  return response.json();
}

export async function getAllOwnedRestaurants() {
  const path = "restaurants/?owned=true";
  const response = await fetch(baseURL + path, {
    method: "GET",
    credentials: "include",
  });
  isAuthenticated(response);
  console.log("Get Owned Restaurant", response);
  return response.json();
}

export async function getRestaurant(id) {
  const path = "restaurants/" + id;
  const response = await fetch(baseURL + path, {
    method: "GET",
    credentials: "include",
  });
  isAuthenticated(response);
  return response.json();
}

export async function createRestaurant(data) {
  console.log("in request", data);
  const path = "restaurants/";
  const response = await fetch(baseURL + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  isAuthenticated(response);

  return response.json;
}

export async function updateRestaurant(id, data) {
  const path = "restaurants/" + id;
  const response = await fetch(baseURL + path, {
    method: "PUT",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  isAuthenticated(response);

  return response.json();
}

export async function deleteRestaurant(id) {
  const path = "restaurants/" + id;
  const response = await fetch(baseURL + path, {
    method: "DELETE",
    credentials: "include",
  });
  isAuthenticated(response);

  return response.json();
}

//Items
export async function getRestaurantMenu(id) {
  const path = "restaurants/" + id + "/items/";
  const response = await fetch(baseURL + path, {
    method: "GET",
    credentials: "include",
  });
  isAuthenticated(response);

  return response.json();
}

export async function createItem(restaurantsID, data) {
  const path = "restaurants/" + restaurantsID + "/items/";
  const response = await fetch(baseURL + path, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  isAuthenticated(response);

  return response.json();
}

export async function updateItem(restaurantsID, itemID, data) {
  const path = "restaurants/" + restaurantsID + "/items/" + itemID;
  const response = await fetch(baseURL + path, {
    method: "PUT",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  isAuthenticated(response);

  return response.json();
}

export async function deleteItem(restaurantsID, itemID) {
  const path = "restaurants/" + restaurantsID + "/items/" + itemID;
  const response = await fetch(baseURL + path, {
    method: "DELETE",
    credentials: "include",
  });
  isAuthenticated(response);

  return response.json();
}

//Cart
export async function updateCart(itemID, quantity) {
  const path = "cart/";
  const response = await fetch(baseURL + path, {
    method: "PUT",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      item: {
        id: itemID,
        quantity: quantity,
      },
    }),
  });
  isAuthenticated(response);

  return response.json();
}

export async function getCartItems() {
  const path = "cart/";
  const response = await fetch(baseURL + path, {
    method: "GET",
    credentials: "include",
  });
  console.log(response.json);
  isAuthenticated(response);

  return response.json();
}

//Orders
export async function createOrder(restaurantID, location) {
  const path = "orders/";
  const response = await fetch(baseURL + path, {
    credentials: "include",
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      restaurantID: restaurantID,
      location: location,
    }),
  });
  isAuthenticated(response);

  return response.json();
}

export async function getOrder(orderID) {
  const path = "orders/" + orderID;
  const response = await fetch(baseURL + path, {
    credentials: "include",
    method: "GET",
  });
  console.log(response.json);
  isAuthenticated(response);

  return response.json();
}

export async function loginWithAuthProvider() {}

function isAuthenticated(response) {
  const baseURL = "http://localhost:3000/";

  if (response.status == 401) {
    const path = "auth/";
    window.location.href = baseURL + path;
  }
}
