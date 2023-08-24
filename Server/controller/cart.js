import cartService from "../services/cart.js";

const cartCorntroller = {
  updateCart: updateCart,
  readCart: readCart,
};

async function updateCart(req, res) {
  const updateResponse = await cartService.updateCart(
    "8968071c-4f3d-4fb9-87f8-4f2ccba4c318",
    req.body.item.id,
    req.body.item.quantity
  );
  res.json(updateResponse);
}

async function readCart(req, res) {
  const readResponse = await cartService.readCart(
    "8968071c-4f3d-4fb9-87f8-4f2ccba4c318"
  );
  res.json(readResponse);
}

export default cartCorntroller;
