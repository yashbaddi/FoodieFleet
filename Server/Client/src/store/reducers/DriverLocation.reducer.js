const initialLocations = {
  latitude: 0,
  longitude: 0,
};

export function driverLocationReducer(state = initialLocations, action) {
  console.log("state:", state);
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_DRIVER_LOCATION":
      console.log("payload:", payload);
      return payload;
    default:
      return state;
  }
}
