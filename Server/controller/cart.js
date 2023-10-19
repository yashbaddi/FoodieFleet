import cartService from "../services/cart.js";

const cartCorntroller = {
  updateCart: updateCart,
  readCart: readCart,
};

async function updateCart(req, res) {
  const updateResponse = await cartService.updateCart(
    res.locals.userID,
    req.body.item.id,
    req.body.item.quantity
  );
  res.json(updateResponse);
}

async function readCart(req, res) {
  const readResponse = await cartService.readCart(res.locals.userID);
  res.json(readResponse);
}

export default cartCorntroller;
