import restaurantModel from "../../model/restaurants.js";

// const restaurantData = {
//   name: "MTR",
//   description: "Traditional Bengaluru Breakfast",
//   timings: {
//     opensAt: 800,
//     closesAt: 2200,
//   },
//   address: {
//     address:
//       "14, Lal Bagh Main Rd, Doddamavalli, Sudhama Nagar, Bengaluru, Karnataka 560027",
//     latitude: 77.5474423,
//     longitude: 12.9551697,
//   },
// };

// // createRestaurant(res.locals.userID, restaurantData);
// console.log(
//   await readRestaurant({
//     id: "b424d354-f611-442e-b384-f80d8597d766",
//   })
// );

console.log(
  await restaurantModel.readRestaurantOwner(
    "dd7ee8dd-87c4-42ac-8270-f382b770f4cc"
  )
);
