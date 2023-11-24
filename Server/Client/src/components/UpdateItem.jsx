import React from "react";
import { updateItem, updateRestaurant } from "../services/requests";
import { useNavigate, useParams } from "react-router-dom";

function UpdateItem() {
  const navigate = useNavigate();
  const { id, itemID } = useParams();

  async function submitItemData() {
    const updatedItemData = {
      name: document.getElementById("itemForm--name").value,
      description: document.getElementById("itemForm--description").value,
      is_vegetarian: document.getElementById("itemForm--veg").value,
      price: document.getElementById("itemForm--price").value,
    };
    const itemCreated = await updateItem(id, itemID, updatedItemData);
    console.log("itemCreated", itemCreated);
    navigate("/restaurant/" + id);
  }
  return (
    <div>
      <label>Name:</label>
      <input type="text" id="itemForm--name"></input>

      <label>Description:</label>
      <input type="text" id="itemForm--description"></input>

      <label>is it vegitarian</label>
      <input type="text" id="itemForm--veg"></input>

      <label>price:</label>
      <input type="text" id="itemForm--price"></input>

      <button type="submit" onClick={submitItemData}>
        Update Item
      </button>
    </div>
  );
}

export default UpdateItem;
