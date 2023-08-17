const baseURL = "http://127.0.0.1:3000/";

export function getAllRestaurants() {
  return async (dispatch) => {
    const path = "restaurants/";
    const response = await fetch(baseURL + path, {
      method: "GET",
    });
    console.log("Get all Restaurant", response);
    const resData = await response.json();
    dispatch({ type: "GET_RESTAURANTS", payload: resData });
  };
}

export function createRestaurant(data) {
  return async (dispatch) => {
    console.log("in request", data);
    const path = "restaurants/";
    const response = await fetch(baseURL + path, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = response.json();
    dispatch({ type: "CREATE_RESTAURANT", payload: resData });
  };
}

export function updateRestaurant(id, data) {
  return async (dispatch) => {
    const path = "restaurants/" + id;
    const response = await fetch(baseURL + path, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = response.json();
    dispatch({ type: "CREATE_RESTAURANT", payload: resData });
  };
}

export async function deleteRestaurant(id) {
  return async (dispatch) => {
    const path = "restaurants/" + id;
    const response = await fetch(baseURL + path, {
      method: "DELETE",
    });
    const resData = response.json();
    dispatch({ type: "CREATE_RESTAURANT", payload: resData });
  };
}
