import HomePageContainer from "../components/HomePageContainer";
import WelcomeToFoodieFleet from "../components/WelcomeToFoodieFleet";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <WelcomeToFoodieFleet />
      <h1 className="text-5xl font-medium text-gray-600 m-10">
        Your Favourite Restaurants
      </h1>
      <HomePageContainer />
    </div>
  );
}
