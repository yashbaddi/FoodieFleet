export default function OrderContainer(props) {
  console.log("OrderContainerProps", props);
  return (
    <div className="border mx-3 my-1 p-2">
      <h1>{props.item.name}</h1>
      <p>Price:{props.item.price}</p>
      <p>quantity:{props.quantity}</p>
    </div>
  );
}
