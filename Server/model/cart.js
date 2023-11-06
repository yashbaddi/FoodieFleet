import pool from "./db-connection.js";

const cartModel = {
  updateQuantityInCart: updateQuantityInCart,
  removeItemFromCart: removeItemFromCart,
  readItemsInCart: readItemsInCart,
};

async function updateQuantityInCart(userID, itemID, quantity = 1) {
  console.log("userID", userID, "itemID", itemID, "quantity", quantity);
  const query = `INSERT INTO cart_items (user_id,item_id,quantity) VALUES($1,$2,$3) 
        ON CONFLICT(user_id,item_id) 
        DO UPDATE SET quantity=$3 RETURNING quantity`;
  console.log(query);
  const updatedItem = await pool.query(query, [userID, itemID, quantity]);
  quantity = updatedItem.rows[0].quantity;

  return {
    itemID: itemID,
    quantity: Number(quantity),
  };
}

async function removeItemFromCart(userID, itemID) {
  console.log({
    itemID,
    UserID: userID,
  });
  const deleteRes = await pool.query(
    "DELETE FROM cart_items WHERE user_id=$1 AND item_id=$2",
    [userID, itemID]
  );
  return { UserID: userID, itemID, quantity: 0 };
}

async function readItemsInCart(userID) {
  let restaurantRes;
  const itemResponse = (
    await pool.query(
      `SELECT row_to_json(items) as item,quantity FROM cart_items 
      JOIN Items ON cart_items.item_ID=items.id 
      where user_id=$1`,
      [userID]
    )
  ).rows;
  // if (itemResponse.length !== 0) {
  //   restaurantRes = await pool.query(
  //     "SELECT row_to_json(restaurants) from restaurants where id=$1",
  //     [itemResponse[0].item.restaurant_id]
  //   );
  //   console.log(restaurantRes);
  // }
  return itemResponse;
}

export default cartModel;
