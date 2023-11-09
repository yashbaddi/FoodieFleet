import { useEffect, useState } from "react";

let counter = 0;

function useGeolocation() {
  const [location, setLocation] = useState({
    isLoaded: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      counter = counter + 0.001;
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const { latitude, longitude } = position.coords;
            setLocation({
              isLoaded: true,
              coordinates: [latitude + counter, longitude + counter],
            });
          },
          function (error) {
            setLocation({
              isLoaded: true,
              error: error.message,
            });
          }
        );
      } else {
        setLocation({
          isLoaded: true,
          error: "Geolocation is not supported in this browser.",
        });
      }
      // console.log("coords:", location);
    }, 5000);
  }, [location]);
  return location;
}

export default useGeolocation;
