import { sampleRestaurant } from "../../hooks/data";
import RestaurantList from "./RestaurantList";

export default function Home() {
  return (
    <>
      Home Page
      <RestaurantList restaurants={sampleRestaurant} />
    </>
  );
}
