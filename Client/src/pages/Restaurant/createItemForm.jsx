import { createItem } from "../../services/requests";

export default function CreateItemForm(props) {
  function submitRestaurantData() {
    createItem(props.restaurantID, {
      name: document.getElementById("itemForm--name").value,
      description: document.getElementById("itemForm--description").value,
      isVegitarian: document.getElementById("itemForm--veg").value,
      price: document.getElementById("itemForm--price").value,
    });
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
      <button type="submit" onClick={submitRestaurantData}>
        Create Item
      </button>
    </div>
  );
}
