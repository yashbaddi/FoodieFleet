import { Link, useParams } from "react-router-dom";
import ItemsList from "../components/ItemList";
import { useEffect, useState } from "react";
import { getRestaurant } from "../services/requests.js";

export default function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    getRestaurant(id).then((data) =>
      data.length !== 0 ? setRestaurant(data) : {}
    );
  }, []);

  console.log("rest:", restaurant);
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="flex flex-col ">
          <h1 className="text-5xl text-gray-800">{restaurant.name}</h1>
          <p className="mx-1 my-0 text-sm text-gray-400">
            {restaurant.description} | {restaurant.cusine_type}
          </p>
          <p className="mx-1 my-0 text-sm text-gray-400">
            {restaurant.address}
          </p>
        </div>
        <div className=" flex flex-col items-end">
          {restaurant.rating && (
            <p className="text-green-600 mx-10 my-0">⭐{restaurant.rating}</p>
          )}
          <p></p>
        </div>
      </div>

      <ItemsList id={id} />
    </div>
  );
}
