import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createItem } from "../../../services/requests";

function CreateItem() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(history);

  async function submitItemData() {
    const newItem = {
      name: document.getElementById("itemForm--name").value,
      description: document.getElementById("itemForm--description").value,
      isVegetarian: document.getElementById("itemForm--veg").value === "True",
      price: document.getElementById("itemForm--price").value,
    };
    const itemCreated = await createItem(id, newItem);
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
        Create Item
      </button>
    </div>
  );
}

export default CreateItem;
