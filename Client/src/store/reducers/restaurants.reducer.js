const initalState = [];

export default function restaurantsReducer(state = initalState, action) {
  switch (action.type) {
    case "CREATE_RESTAURANT":
      return [...state, action.payload];
    case "GET_RESTAURANTS":
      return action.payload;
    default:
      return state;
  }
}
