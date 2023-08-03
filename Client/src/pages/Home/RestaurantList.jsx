import RestaurantContainer from "./RestaurantContainer";

export default function RestaurantList(props) {
  return (
    <>
      List of Restaurant
      {props.restaurants.map((restaurant, index) => {
        return (
          <RestaurantContainer
            key={index}
            id={restaurant.id}
            name={restaurant.name}
            desc={restaurant.description}
          />
        );
      })}
    </>
  );
}
