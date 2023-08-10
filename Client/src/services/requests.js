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
