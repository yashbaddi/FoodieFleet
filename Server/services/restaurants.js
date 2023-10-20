import restaurantModel from "../model/restaurants.js";
import itemModel from "../model/items.js";

const restaurantService = {
  getAllRestaurants: getAllRestaurants,
  getAllOpenedRestaurants: getAllOpenedRestaurants,
  getRestaurantsByOwner: getRestaurantsByOwner,
  getRestaurantsByID: getRestaurantsByID,
  getMenuOfRestaurant: getMenuOfRestaurant,
  createRestaurant: createRestaurant,
  createItemForRestaurant: createItemForRestaurant,
  updateItemOfRestaurant: updateItemOfRestaurant,
  deleteItemInRestaurant: deleteItemInRestaurant,
  updateRestaurantByID: updateRestaurantByID,
  deleteRestaurantByID: deleteRestaurantByID,
};

async function getAllRestaurants() {
  const data = await restaurantModel.readRestaurant();
  const response = data.map((restaurant) => restaurant.data);
  return response;
}

async function getAllOpenedRestaurants() {
  const data = await restaurantModel.readRestaurant({ opened: true });
  const response = data.map((restaurant) => restaurant.data);
  return response;
}

async function getRestaurantsByOwner(ownerID) {
  const data = restaurantModel.readRestaurant({ ownerID: ownerID });
  const response = data.map((restaurant) => restaurant.data);
  return response;
}

async function getRestaurantsByID(restaurnatID) {
  const data = restaurantModel.readRestaurant({ id: restaurnatID });
  return data;
}

async function getMenuOfRestaurant(restaurantID) {
  const response = await itemModel.readItem(restaurantID);
  return response;
}
async function createRestaurant(userID, restaurantData) {
  const response = await restaurantModel.createRestaurant(
    userID,
    restaurantData
  );
  return response;
}

async function createItemForRestaurant(restaurantID, itemData) {
  const response = await itemModel.createItem(restaurantID, itemData);
  return response;
}

async function updateItemOfRestaurant(itemID, itemData) {
  const response = await itemModel.updateItem(itemID, itemData);
  return response;
}

async function deleteItemInRestaurant(itemID) {
  const response = await itemModel.deleteItem(itemID);
  return response;
}

async function updateRestaurantByID(restaurantID, restaurantData) {
  const updatedResponse = await restaurantModel.updateRestaurant(
    restaurantID,
    restaurantData
  );
  return updatedResponse;
}

async function deleteRestaurantByID(restaurantID) {
  const deleteResponse = await restaurantModel.deleteRestaurant(restaurantID);
  return deleteResponse;
}

export default restaurantService;
