import React from "react";
import { createRestaurant, updateRestaurant } from "../../../services/requests";
import { useNavigate, useParams } from "react-router-dom";

function UpdateRestaurant() {
  const navigate = useNavigate();
  const { id } = useParams();

  async function submitRestaurantData() {
    const restaurantData = {
      id: id,
      name: document.getElementById("restaurantForm--name").value,
      description: document.getElementById("restaurantForm--description").value,
      timings: {
        opensAt: Number(document.getElementById("restaurantForm--open").value),
        closesAt: Number(
          document.getElementById("restaurantForm--close").value
        ),
      },
    };
    await updateRestaurant(id, restaurantData);
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

      <button type="submit" onClick={submitRestaurantData}>
        Update Restaurant
      </button>
    </div>
  );
}

export default UpdateRestaurant;
