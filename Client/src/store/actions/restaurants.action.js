const baseURL = "http://127.0.0.1:3000/";

export function getAllRestaurants() {
  return async (dispatch) => {
    const path = "restaurants/";
    const response = await fetch(baseURL + path, {
      method: "GET",
    });
    console.log("Get all Restaurant", response);
    const data = await response.json();
    dispatch({ type: "FETCH_RESTAURANTS", payload: data });
  };
}
