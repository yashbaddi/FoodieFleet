import { getCartItemsAction } from "../store/actionCreators/cart.action";
import ItemContainerCart from "../components/ItemContainerCart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createOrder, getRestaurant } from "../services/requests";
import useGeolocation from "../hooks/useGeoLocation";
import { createUserSocketConnect } from "../services/ws-connection";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  // const [orderedItems, setOrderedItems] = useState([]);
  // const dispatch = useDispatch();
  const orderedItemsData = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useGeolocation();

  console.log("OrderItemData:", orderedItemsData);
  // const dispatch = useDispatch();
  // const restaurants = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItemsAction());
  }, []);

  async function placeOrder() {
    // createUserSocketConnect();

    console.log("loca:", location);
    if (location.isLoaded) {
      const res = await createOrder(
        orderedItemsData[0].item.restaurant_id,
        location.coordinates
      );
      navigate("/track-order/" + res.orderID);
      // break;.
    }

    // console.log("orderCreated:", res);
  }

  return (
    <>
      <h1>Orders</h1>
      {orderedItemsData.map((orderedItem, index) => {
        return (
          <ItemContainerCart
            key={index}
            item={orderedItem.item}
            quantity={orderedItem.quantity}
          />
        );
      })}
      {location.isLoaded ? (
        <button onClick={placeOrder}>Place Order</button>
      ) : (
        <p>Getting Location Data</p>
      )}
    </>
  );
}
