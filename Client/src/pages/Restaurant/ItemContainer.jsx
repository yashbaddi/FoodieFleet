import { Link } from "react-router-dom";

export default function ItemContainer(props) {
  console.log("Item Conosle:", props);
  return (
    <>
      <Link
        to={`/restaurant/${"props.restaurantID"}/cusine/${"props.cusineID"}`}
      >
        <div className="border mx-3 my-1 p-2">
          <h3>{props.name}</h3>
          <p>{props.desc}</p>
          <p>vegitarian:{props.vegitarian}</p>
          <p>price:{props.price}</p>
        </div>
      </Link>
    </>
  );
}
