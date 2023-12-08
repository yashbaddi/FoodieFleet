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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItemsAction());
  }, []);

  async function placeOrder() {
    if (location.isLoaded) {
      const res = await createOrder(
        orderedItemsData[0].item.restaurant_id,
        location.coordinates
      );
      navigate("/track-order/" + res.order.id);
    }
  }

  return (
    <div className="grid grid-cols-12">
      <div className="flex flex-col items-center col-start-3 col-end-9">
        <h1 className="font-bold text-3xl text-gray-700 m-5">Your Cart</h1>
        {orderedItemsData.length !== 0 ? (
          <div className="flex flex-col  rounded shadow-lg p-4">
            <div className="">
              {orderedItemsData.map((orderedItem, index) => {
                return (
                  <ItemContainerCart
                    key={index}
                    item={orderedItem.item}
                    quantity={orderedItem.quantity}
                  />
                );
              })}
            </div>
            {location.isLoaded ? (
              <button
                className="bg-green-600 hover:bg-green-900 text-gray-100 shadow rounded p-2 m-4 self-end"
                onClick={placeOrder}
              >
                Place Order
              </button>
            ) : (
              <p className=" text-gray-800 font-semibold rounded p-1 m-4 self-end">
                Getting Location Data...
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-700 font-semibold col-start-5 col-end-10">
            You do not have any items in cart!
          </p>
        )}
      </div>
    </div>
  );
}
