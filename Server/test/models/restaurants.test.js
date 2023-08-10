import { createRestaurant, readRestaurant } from "../../model/restaurants.js";

const restaurantData = {
  name: "MTR",
  description: "Traditional Bengaluru Breakfast",
  timings: {
    opensAt: 800,
    closesAt: 2200,
  },
  address: {
    address:
      "14, Lal Bagh Main Rd, Doddamavalli, Sudhama Nagar, Bengaluru, Karnataka 560027",
    latitude: 77.5474423,
    longitude: 12.9551697,
  },
};

// createRestaurant("8968071c-4f3d-4fb9-87f8-4f2ccba4c318", restaurantData);
console.log(
  await readRestaurant({
    id: "b424d354-f611-442e-b384-f80d8597d766",
  })
);
