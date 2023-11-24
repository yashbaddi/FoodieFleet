import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import deliveryBoyIcon from "../assets/delivery-boy.svg";
import restaurantIcon from "../assets/restaurant.svg";
import deliveryLocationIcon from "../assets/house.svg";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import "leaflet-routing-machine";
import L, { Icon } from "leaflet";
import { useSelector } from "react-redux";

const DeliveryBoyMarker = new Icon({
  iconUrl: deliveryBoyIcon,
  iconSize: [35, 45],
});

const HouseMarker = new Icon({
  iconUrl: deliveryLocationIcon,
  iconSize: [35, 45],
});

const RestaurantMarker = new Icon({
  iconUrl: restaurantIcon,
  iconSize: [35, 45],
});

export default function MapComponent({ userLocation, restaurantLocation }) {
  const driverLocation = useSelector((state) => state.driverLocation);
  console.log("driverLocation:", driverLocation);
  console.log({
    "user:": userLocation,
    "restar:": restaurantLocation,
    "driver:": driverLocation,
  });
  function MapController() {
    const map = useMap();
    console.log("map");

    useEffect(() => {
      console.log("mapRef", map);
      map.flyTo([driverLocation.latitude, driverLocation.longitude], 18, {
        animate: true,
      });
    }, []);

    useEffect(() => {
      const routing = L.Routing.control({
        waypoints: [
          L.latLng(driverLocation.latitude, driverLocation.longitude),
          L.latLng(restaurantLocation.latitude, restaurantLocation.longitude),
          L.latLng(userLocation.latitude, userLocation.longitude),
        ],
        createMarker: function () {
          return null;
        },

        routeWhileDragging: false,
        show: false,
        lineOptions: {
          styles: [{ color: "black", opacity: 1, weight: 4 }],
        },
      }).addTo(map);
      return () => {
        routing.remove();
      };
    }, []);
  }
  return (
    <>
      <div>
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          ></TileLayer>
          {driverLocation.latitude && driverLocation.longitude && (
            <div>
              <MapController />
              <Marker
                position={[userLocation.latitude, userLocation.longitude]}
                icon={HouseMarker}
              >
                <Popup>
                  <b>Delivery Location</b>
                </Popup>
              </Marker>
              <Marker
                position={[
                  restaurantLocation.latitude,
                  restaurantLocation.longitude,
                ]}
                icon={RestaurantMarker}
              >
                <Popup>
                  <b>Restaurant</b>
                </Popup>
              </Marker>
              <Marker
                position={[driverLocation.latitude, driverLocation.longitude]}
                icon={DeliveryBoyMarker}
              >
                <Popup>
                  <b>Delivery Partner</b>
                </Popup>
              </Marker>
            </div>
          )}
        </MapContainer>
      </div>
    </>
  );
}
