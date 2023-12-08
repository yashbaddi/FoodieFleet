import pool from "./db-connection.js";

const cartModel = {
  updateQuantityInCart,
  removeItemFromCart,
  readItemsInCart,
  clearItemsInCart,
};

async function updateQuantityInCart(userID, itemID, quantity = 1) {
  await removeDifferentRestaurantCartItems(userID, itemID);

  const query = `INSERT INTO cart_items (user_id,item_id,quantity) VALUES($1,$2,$3) 
        ON CONFLICT(user_id,item_id) 
        DO UPDATE SET quantity=$3 RETURNING quantity`;
  const updatedItem = await pool.query(query, [userID, itemID, quantity]);
  quantity = updatedItem.rows[0].quantity;

  return {
    itemID: itemID,
    quantity: Number(quantity),
  };
}

async function removeDifferentRestaurantCartItems(userID, itemID) {
  const restaurantID = (
    await pool.query(`SELECT restaurant_id from items where id=$1`, [itemID])
  ).rows[0]?.restaurant_id;

  if (restaurantID) {
    await pool.query(
      `DELETE FROM cart_items using items WHERE item_id=items.id AND user_id=$1 AND items.restaurant_id!=$2`,
      [userID, restaurantID]
    );
  }
}

async function removeItemFromCart(userID, itemID) {
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

  return itemResponse;
}

async function clearItemsInCart(userID) {
  const dataResponse = await pool.query(
    `DELETE FROM cart_items WHERE user_id=$1`,
    [userID]
  );
  return dataResponse;
}

export default cartModel;
