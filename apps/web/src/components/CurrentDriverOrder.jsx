import {
  setOrderToDeliveredWS,
  setOrderToDeliveringWS,
} from "../services/ws-connection";

function CurrentDriverOrder({ ws, order }) {
  function OrderPicked() {
    setOrderToDeliveringWS(ws, order.id);
  }

  function OrderDelivered() {
    setOrderToDeliveredWS(ws, order.id);
  }
  return (
    <div>
      <p>Restaurant Name:{order.restaurant.name}</p>
      <p>Delivery Location</p>
      <p>Latitude:{order.delivery_location.latitude}</p>
      <p>Longitude:{order.delivery_location.longitude}</p>
      <button onClick={OrderPicked}>Order Picked</button>
      <button onClick={OrderDelivered}>Order Delivered</button>
    </div>
  );
}

export default CurrentDriverOrder;
