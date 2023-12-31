import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createItem } from "../services/requests";

function CreateItem() {
  const navigate = useNavigate();
  const { id } = useParams();

  async function submitItemData() {
    const newItem = {
      name: document.getElementById("itemForm--name").value,
      description: document.getElementById("itemForm--description").value,
      isVegetarian: document.getElementById("itemForm--veg").value === "True",
      price: document.getElementById("itemForm--price").value,
      submenu: document.getElementById("itemForm--submenu").value,
    };
    const itemCreated = await createItem(id, newItem);
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
      <label>price:</label>
      <input type="text" id="itemForm--submenu"></input>
      <button type="submit" onClick={submitItemData}>
        Create Item
      </button>
    </div>
  );
}

export default CreateItem;
