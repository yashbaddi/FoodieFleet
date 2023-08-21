export async function updateQuantityInCart(userID, itemID, quantity) {
  const query = `INSERT INTO cart_items (user_id,item_id) VALUES($1,$2) 
        ON CONFLICT(order_id,item_id) 
        DO UPDATE SET quantity=$3 RETURNING quantity`;
  console.log(query);
  const updatedItem = await pool.query(query, [userID, itemID, quantity]);
  quantity = updatedItem.rows[0].quantity;

  return {
    itemID: itemID,
    quantity: Number(quantity),
  };
}
