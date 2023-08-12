import { createRestaurant } from "../../services/requests";

export default function CreateRestaurantForm() {
  function submitRestaurantData() {
    createRestaurant({
      name: document.getElementById("restaurantForm--name").value,
      description: document.getElementById("restaurantForm--description").value,
      timings: {
        opensAt: Number(document.getElementById("restaurantForm--open").value),
        closesAt: Number(
          document.getElementById("restaurantForm--close").value
        ),
      },
    });
  }
  return (
    <div>
      <label>Name:</label>
      <input type="text" id="restaurantForm--name"></input>
      <label>Description:</label>
      <input type="text" id="restaurantForm--description"></input>
      <label>Opens At:</label>
      <input type="text" id="restaurantForm--open"></input>
      <label>Closes At:</label>
      <input type="text" id="restaurantForm--close"></input>
      <button type="submit" onClick={submitRestaurantData}>
        Create Restaurant
      </button>
    </div>
  );
}
