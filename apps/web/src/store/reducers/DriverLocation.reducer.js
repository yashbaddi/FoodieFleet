const initialLocations = {
  latitude: 0,
  longitude: 0,
};

export function driverLocationReducer(state = initialLocations, action) {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_DRIVER_LOCATION":
      return payload;
    default:
      return state;
  }
}
