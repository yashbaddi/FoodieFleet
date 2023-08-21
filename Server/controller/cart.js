import { removeItemFromCart, updateQuantityInCart } from "../model/cart";

export async function updateCart(req, res) {
  if (req.body.item.quantity > 0) {
    const updateResponse = await updateQuantityInCart(
      "8968071c-4f3d-4fb9-87f8-4f2ccba4c318",
      req.body.item.id,
      req.body.item.quantity
    );

    res.json(updateResponse);
  }

  if (req.body.item.quantity <= 0) {
    const deleteResponse = await removeItemFromCart(
      "8968071c-4f3d-4fb9-87f8-4f2ccba4c318",
      req.body.item.id
    );

    res.json(deleteResponse);
  }
}