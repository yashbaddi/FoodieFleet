import { createItem, readItem } from "../../model/items.js";

createItem("d2225227-8fe2-4045-bfd2-734d76e0e2bd", {
  name: "Rava Idly",
  isVegitarian: true,
  description: "The original rava idly",
  price: 50,
});

console.log(await readItem("b424d354-f611-442e-b384-f80d8597d766"));
