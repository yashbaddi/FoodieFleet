import { createRestaurant } from "../services/requests";
import { useNavigate } from "react-router-dom";

function NewRestaurant() {
  const navigate = useNavigate();
  async function submitRestaurantData() {
    await createRestaurant({
      name: document.getElementById("restaurantForm--name").value,
      description: document.getElementById("restaurantForm--description").value,
      timings: {
        open: Number(document.getElementById("restaurantForm--open").value),
        close: Number(document.getElementById("restaurantForm--close").value),
      },
      location: {
        latitude: Number(
          document.getElementById("restaurantForm--latitude").value
        ),
        longitude: Number(
          document.getElementById("restaurantForm--longitude").value
        ),
      },
    });
    navigate("/");
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
      <label>Location Latitude</label>
      <input type="text" id="restaurantForm--latitude"></input>
      <label>Location Longitude</label>
      <input type="text" id="restaurantForm--longitude"></input>
      <button type="submit" onClick={submitRestaurantData}>
        Create Restaurant
      </button>
    </div>
  );
}

export default NewRestaurant;
