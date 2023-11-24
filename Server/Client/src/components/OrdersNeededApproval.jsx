import OrderContainerApproval from "./OrderContainerApproval";

function OrdersNeededApproval({ orders, ws, updateOrderList }) {
  console.log("orders needed approval", orders);

  return (
    <div>
      <h1>OrderNeedApprval</h1>
      {orders.map((order) => {
        return (
          <OrderContainerApproval
            order={order}
            ws={ws}
            key={order.id}
            updateOrderList={updateOrderList}
          />
        );
      })}
    </div>
  );
}

export default OrdersNeededApproval;
