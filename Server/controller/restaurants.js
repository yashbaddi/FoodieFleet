import restaurantService from "../services/restaurants.js";

const restaurantController = {
  getAllRestaurants: getAllRestaurants,
  getRestaurantsByID: getRestaurantsByID,
  getMenuOfRestaurant: getMenuOfRestaurant,
  createRestaurant: createRestaurant,
  createItemForRestaurant: createItemForRestaurant,
  updateItemOfRestaurant: updateItemOfRestaurant,
  deleteItemInRestaurant: deleteItemInRestaurant,
  updateRestaurantByID: updateRestaurantByID,
  deleteRestaurantByID: deleteRestaurantByID,
};

async function getAllRestaurants(req, res) {
  const response = await restaurantService.getAllRestaurants();
  res.json(response);
}

async function getRestaurantsByID(req, res) {
  const response = await restaurantService.getRestaurantsByID(req.params.id);
  res.json(response);
}

async function getMenuOfRestaurant(req, res) {
  const response = await restaurantService.getMenuOfRestaurant(
    req.params.restaurantID
  );
  res.json(response);
}

async function createRestaurant(req, res) {
  const response = await restaurantService.createRestaurant(
    "8968071c-4f3d-4fb9-87f8-4f2ccba4c318",
    req.body
  );
  res.json(response);
}

async function createItemForRestaurant(req, res) {
  const response = await restaurantService.createItemForRestaurant(
    req.params.restaurantID,
    req.body
  );
  res.json(response);
}

async function updateItemOfRestaurant(req, res) {
  const response = await restaurantService.updateItemOfRestaurant(
    req.params.itemID,
    req.body
  );
  res.json(response);
}

async function deleteItemInRestaurant(req, res) {
  const response = await restaurantService.deleteItemInRestaurant(
    req.params.itemID
  );
  res.json(response);
}

async function updateRestaurantByID(req, res) {
  const response = await restaurantService.updateRestaurantByID(
    req.params.id,
    req.body
  );
  res.json(response);
}

async function deleteRestaurantByID(req, res) {
  const response = await restaurantService.deleteRestaurantByID(req.params.id);
  res.json(response);
}

export default restaurantController;
