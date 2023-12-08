import { useEffect, useState } from "react";

function useGeolocation() {
  const [location, setLocation] = useState({
    isLoaded: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const { latitude, longitude } = position.coords;
            setLocation({
              isLoaded: true,
              coordinates: [latitude, longitude],
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
    }, 2000);
  }, []);
  return location;
}

export default useGeolocation;
