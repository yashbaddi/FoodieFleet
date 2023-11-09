/* eslint-disable no-empty */
import { store } from "../store";

import { updateDriverLocation } from "../store/actionCreators/driverLocation.action";

const serverUrl = "ws://localhost:3000/";

export function createUserSocketConnect() {
  const wsClient = new WebSocket(serverUrl + "user/ws");
  wsClient.onopen = (ws) => {
    console.log("user socket connection success");
  };
  const interval = setInterval(() => {
    wsClient.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);
  wsClient.onmessage = (message) => {
    const msg = JSON.parse(message.data.toString());
    if (msg.type === "open") {
    }
    if (msg.type === "driver_location") {
      console.log("msg:", msg);

      store.dispatch(updateDriverLocation(msg.data));
    }
    if (msg.type === "notification") {
    }
  };
  wsClient.onclose = () => {
    clearInterval(interval);
  };
  return wsClient;
}
export function createRestaurantSocketConnect() {
  const wsClient = new WebSocket(serverUrl + "restaurants/ws");
  wsClient.onopen = (ws) => {
    console.log("restaurant socket connection success");
  };
  const interval = setInterval(() => {
    wsClient.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);
  wsClient.onmessage = (message) => {
    const msg = JSON.parse(message.data.toString());
    console.log("msg:", msg);
    if (msg.type === "order") {
    }
  };
  wsClient.onclose = () => {
    clearInterval(interval);
  };
  return wsClient;
}
export function createDriverSocketConnect() {
  const wsClient = new WebSocket(serverUrl + "driver/ws");
  wsClient.onopen = (ws) => {
    console.log("driver socket connection success");
  };
  const interval = setInterval(() => {
    wsClient.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);
  wsClient.onmessage = (message) => {
    const msg = JSON.parse(message.data.toString());
    console.log("msg:", msg);
    if (msg.type === "order") {
    }
  };
  wsClient.onclose = () => {
    clearInterval(interval);
  };
  return wsClient;
}
