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
