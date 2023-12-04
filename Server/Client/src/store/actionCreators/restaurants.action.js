import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  updateRestaurant,
} from "../../services/requests";

export function getAllRestaurantsAction() {
  return async (dispatch) => {
    const resData = await getAllRestaurants();
    dispatch({ type: "GET_RESTAURANTS", payload: resData });
  };
}

export function createRestaurantAction(data) {
  return async (dispatch) => {
    const resData = await createRestaurant(data);
    dispatch({ type: "CREATE_RESTAURANT", payload: resData });
  };
}

export function updateRestaurantAction(id, data) {
  return async (dispatch) => {
    const resData = await updateRestaurant(id, data);
    dispatch({ type: "UPDATE_RESTAURANT", payload: resData });
  };
}

export async function deleteRestaurantAction(id) {
  return async (dispatch) => {
    const resData = deleteRestaurant(id);
    dispatch({ type: "DELETE_RESTAURANT", payload: id });
  };
}
