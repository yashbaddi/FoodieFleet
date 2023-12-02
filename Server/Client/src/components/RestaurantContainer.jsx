import { Link } from "react-router-dom";

export default function RestaurantContainer({ restaurant }) {
  console.log("Restaurant props", restaurant);

  return (
    <>
      <Link
        to={`/restaurant/${restaurant.id}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <div className="border-2 border-orange-400 hover:border-orange-600 rounded flex flex-col shadow-xl h-48">
          <div
            className="h-full w-full p-4 bg-orange-400 hover:bg-orange-600 rounded-b-3xl p-2 h-24 shadow
            "
          >
            <div className="self-center flex items-center flex-col ">
              <h1 className="m-0 text-xl text-orange-50">{restaurant.name}</h1>
              <p className="m-0 text-xs text-orange-200">
                {restaurant.address}
              </p>
            </div>
          </div>
          <div className="my-4 m-4">
            <p className="m-0 text-xs text-gray-500">
              {restaurant.description}
            </p>
            <p className="m-0">{restaurant.cusine_type}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
