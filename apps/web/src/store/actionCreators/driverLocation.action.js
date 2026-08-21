export function updateDriverLocation(location) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_DRIVER_LOCATION",
      payload: {
        latitude: Number(location[1]),
        longitude: Number(location[0]),
      },
    });
  };
}
