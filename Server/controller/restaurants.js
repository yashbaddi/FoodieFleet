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
  if (req.query.opened) {
    const response = await restaurantService.getAllOpenedRestaurants();
    res.json(response);
  } else if (req.query.ownerID) {
    const response = await restaurantService.getRestaurantsByOwner(
      req.query.ownerID
    );
    res.json(response);
  } else {
    const response = await restaurantService.getAllRestaurants();
    res.json(response);
  }
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
    res.locals.userID,
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
