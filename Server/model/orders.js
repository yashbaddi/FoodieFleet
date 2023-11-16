import { getUpdateExpression } from "../utils.js";
import pool from "./db-connection.js";

const orderModel = {
  createOrder,
  readOrders: readOrders,
  updateQuantity,
  deleteItemFromOrder,
  patchOrder,
  updateOrderStatus,
};

async function createOrder(userID, data, driver, location) {
  console.log("drover:", driver);
  const orderID = (
    await pool.query(
      "INSERT INTO orders(customer_id,restaurant_id,driver_id,delivery_location) values($1,$2,$3,$4) RETURNING ID",
      [userID, data.restaurantID, driver, location]
    )
  ).rows[0].id;
  console.log("orderID", orderID);

  const itemOrders = (
    await pool.query(
      "INSERT INTO ordered_items(order_id,item_id,quantity) SELECT $2,item_id,quantity FROM cart_items WHERE user_id=$1 RETURNING (item_id,quantity)",
      [userID, orderID]
    )
  ).rows;
  return {
    orderID: orderID,
    items: itemOrders,
  };
}

async function readOrders(filters = {}) {
  if (filters.id) {
    const query = `select orders.*,row_to_json(restaurants) as restaurant,row_to_json(users) as driver,json_agg(json_build_object('item',items.*,'quantity',ordered_items.quantity)) as items from orders 
  left join restaurants on orders.restaurant_id=restaurants.id 
  left join users on orders.driver_id=users.id 
  join ordered_items on ordered_items.order_id=orders.id 
  join items on ordered_items.item_id=items.id 
  where orders.id=$1
  group by orders.id,restaurants.id,users.id`;

    return (await pool.query(query, [filters.id])).rows;
  }

  if (filters.userID) {
    const query = `select orders.*,row_to_json(restaurants) as restaurant,row_to_json(users) as driver,json_agg(json_build_object('item',items.*,'quantity',ordered_items.quantity)) as items from orders 
    left join restaurants on orders.restaurant_id=restaurants.id 
    left join users on orders.driver_id=users.id 
    join ordered_items on ordered_items.order_id=orders.id 
    join items on ordered_items.item_id=items.id 
    where orders.customer=$1
    group by orders.id,restaurants.id,users.id`;
    return (await pool.query(query, [filters.userID])).rows;
  }

  if (filters.ownerID) {
    const query = `select orders.*,row_to_json(restaurants) as restaurant,row_to_json(users) as driver,json_agg(json_build_object('item',items.*,'quantity',ordered_items.quantity)) as items from orders 
    left join restaurants on orders.restaurant_id=restaurants.id 
    left join users on orders.driver_id=users.id 
    join ordered_items on ordered_items.order_id=orders.id 
    join items on ordered_items.item_id=items.id 
    where restaurants.owner_id=$1
    group by orders.id,restaurants.id,users.id`;
    return (await pool.query(query, [filters.ownerID])).rows;
  }

  if (filters.driverID) {
    const query = `select orders.*,row_to_json(restaurants) as restaurant,row_to_json(users) as driver,json_agg(json_build_object('item',items.*,'quantity',ordered_items.quantity)) as items from orders 
    left join restaurants on orders.restaurant_id=restaurants.id 
    left join users on orders.driver_id=users.id 
    join ordered_items on ordered_items.order_id=orders.id 
    join items on ordered_items.item_id=items.id 
    where orders.driver_id=$1
    group by orders.id,restaurants.id,users.id`;
    return (await pool.query(query, [filters.driverID])).rows;
  }

  const query = `select orders.*,row_to_json(restaurants) as restaurant,row_to_json(users) as driver,json_agg(json_build_object('item',items.*,'quantity',ordered_items.quantity)) as items from orders 
  left join restaurants on orders.restaurant_id=restaurants.id 
  left join users on orders.driver_id=users.id 
  join ordered_items on ordered_items.order_id=orders.id 
  join items on ordered_items.item_id=items.id 
  group by orders.id,restaurants.id,users.id`;
  return (await pool.query(query)).rows;
}

async function updateQuantity(orderID, itemID, quantity) {
  const query = `INSERT INTO ordered_items (order_id,item_id) VALUES($1,$2) 
      ON CONFLICT(order_id,item_id) 
      DO UPDATE SET quantity=$3 RETURNING quantity`;
  console.log(query);
  const updatedItem = await pool.query(query, [orderID, itemID, quantity]);
  quantity = updatedItem.rows[0].quantity;

  return {
    orderID: orderID,
    itemID: itemID,
    quantity: Number(quantity),
  };
}

async function updateOrderStatus(orderID, status) {
  if (status === "picked") {
    const query =
      "UPDATE orders SET status=$2,pickup_time=CURRENT_TIMESTAMP WHERE id=$1";
    return (await pool.query(query, [orderID, status])).rows;
  }
  if (status == "delivered") {
    const query =
      "UPDATE orders SET status=$2,delivered_time=CURRENT_TIMESTAMP WHERE id=$1";
    return (await pool.query(query, [orderID, status])).rows;
  }
}

async function deleteItemFromOrder(orderID, itemID) {
  console.log({
    itemID,
    orderID,
  });
  const deleteRes = await pool.query(
    "DELETE FROM ordered_items WHERE order_id=$1 AND item_id=$2",
    [orderID, itemID]
  );
  return { orderID, itemID, quantity: 0 };
}

async function patchOrder(id, data) {
  const [expression, values] = getUpdateExpression(data);
  console.log(values);

  const query =
    "UPDATE orders SET" +
    expression +
    " WHERE id=$" +
    (values.length + 1) +
    " RETURNING *";
  console.log(query);

  const updatedData = await pool.query(query, [...values, id]);

  return {
    orderID: id,
    data: updatedData.rows[0],
  };
}

// export async function createOrderedItem(orderID, data = {}) {
//   await pool.query(
//     "INSERT INTO Ordered_Items(order_id,item_id) VALUES($1,$2)",
//     [orderID, data.itemID]
//   );

//   return { orderID: orderID, itemID: data.itemID };
// }

// export async function readOrderedItems(filters) {
//   if (filters.userID) {
//     return (
//       await pool.query("SELECT * FROM ordered_items where userID=$1", [
//         filters.userID,
//       ])
//     ).rows;
//   }
//   if (filters.orderID) {
//     return (
//       await pool.query("SELßECT * FROM ordered_items where orderID=$1", [
//         filters.orderIDß,
//       ])
//     ).rows;
//   }
// }

export default orderModel;
