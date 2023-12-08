import OrderContainerApproval from "./OrderContainerApproval";

function OrdersNeededApproval({ orders, ws, updateOrderList }) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-700">OrderNeedApprval</h1>
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
