// import { createItem, readItem } from "../../model/items.js";
import itemModel from "../../model/items.js";

itemModel.createItem("e1c1a98f-b346-4edb-b989-956464081dbc", {
  name: "Chocolate Sablée",
  isVegetarian: true,
  description: "Chocolate filled short crust pastry serving size: 125gms",
  price: 190.48,
});

// console.log(await readItem("b424d354-f611-442e-b384-f80d8597d766"));
