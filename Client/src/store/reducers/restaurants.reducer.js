const initalState = [];

export default function restaurantsReducer(state = initalState, action) {
  switch (action.type) {
    case "CREATE_RESTAURANTS":
      return [...state, action.payload];
    case "FETCH_RESTAURANTS":
      return action.payload;
    default:
      return state;
  }
}
