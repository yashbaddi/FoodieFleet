export function updateDriverLocation(location) {
  //   console.log(location);
  return (dispatch) => {
    dispatch({
      type: "UPDATE_DRIVER_LOCATION",
      payload: {
        latitude: Number(location[0]),
        longitude: Number(location[1]),
      },
    });
  };
}
