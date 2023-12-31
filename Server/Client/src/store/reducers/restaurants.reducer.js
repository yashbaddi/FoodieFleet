const initalState = [];

export default function restaurantsReducer(state = initalState, action) {
  switch (action.type) {
    case "CREATE_RESTAURANT":
      return [...state, action.payload];
    case "GET_RESTAURANTS":
      return action.payload;
    case "UPDATE_RESTAURANT":
      return state.map((restaurant) =>
        restaurant.id === action.payload.id ? action.payload : restaurant
      );
    case "DELETE_RESTAURANT":
      return state.filter((restaurant) => restaurant.id === action.payload.id);
    default:
      return state;
  }
}
