import { getCartItemsAction } from "../../store/actionCreators/cart.action";
import OrderContainer from "./OrderContainers";
import { useDispatch, useSelector } from "react-redux";

export default function Order() {
  // const [orderedItems, setOrderedItems] = useState([]);
  // const dispatch = useDispatch();
  const orderedItemsData = useSelector((state) => state.cart);
  console.log("OrderItemData:", orderedItemsData);
  const dispatch = useDispatch();
  // const restaurants = useSelector((state) => state.restaurants);
  // const dispatch = useDispatch();
  dispatch(getCartItemsAction());
  ``;
  // useEffect(() => {
  //   // dispatch(getOrderDetails(orderID));
  //   setOrderedItems(orderedItemsData);
  // }, [orderedItemsData]);

  return (
    <>
      <h1>Orders</h1>
      {orderedItemsData.map((orderedItem, index) => {
        return (
          <OrderContainer
            key={index}
            item={orderedItem.item}
            quantity={orderedItem.quantity}
          />
        );
      })}
    </>
  );
}
