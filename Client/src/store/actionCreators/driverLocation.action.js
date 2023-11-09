export function updateDriverLocation(location) {
  //   console.log(location);
  return (dispatch) => {
    dispatch({
      type: "UPDATE_DRIVER_LOCATION",
      payload: {
        latitude: Number(location.latitude),
        longitude: Number(location.longitude),
      },
    });
  };
}
