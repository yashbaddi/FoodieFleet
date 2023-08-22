import pool from "./db-connection.js";

export async function updateQuantityInCart(userID, itemID, quantity = 1) {
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

export async function removeItemFromCart(userID, itemID) {
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

export async function readItemsInCart(userID) {
  const readResponse = (
    await pool.query(
      `SELECT row_to_json(items) as item ,quantity FROM cart_items 
      JOIN Items ON cart_items.item_ID= items.id where user_id=$1`,
      [userID]
    )
  ).rows;
  return readResponse;
}
