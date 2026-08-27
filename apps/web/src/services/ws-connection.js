/* eslint-disable no-empty */
import config from "../../config";
import { store } from "../store";

import { updateDriverLocation } from "../store/actionCreators/driverLocation.action";

const serverUrl = config.api.wsURL;

export function createUserSocketConnect(getNotifications) {
  const wsClient = new WebSocket(serverUrl + "user/ws");
  wsClient.onopen = (ws) => {};
  const interval = setInterval(() => {
    wsClient.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);
  wsClient.onmessage = (message) => {
    const msg = JSON.parse(message.data.toString());
    if (msg.type === "open") {
    }
    if (msg.type === "partner_location") {
      store.dispatch(updateDriverLocation(msg.data));
    }
    if (msg.type === "notification") {
      getNotifications(msg.data);
    }
    // if (msg.type === "partner_information") {
    //   setPartnerInformation(msg.data);
    // }
  };
  wsClient.onclose = () => {
    clearInterval(interval);
  };
  return wsClient;
}

export function createRestaurantSocketConnect(setNewOrder, getNotifications) {
  const wsClient = new WebSocket(serverUrl + "restaurants/ws");
  wsClient.onopen = (ws) => {};
  const interval = setInterval(() => {
    wsClient.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);
  wsClient.onmessage = (message) => {
    const msg = JSON.parse(message.data.toString());
    if (msg.type === "order") {
      setNewOrder(msg.data);
    }
    if (msg.type === "notification") {
      getNotifications(msg.data);
    }
  };
  wsClient.onclose = () => {
    clearInterval(interval);
  };
  return wsClient;
}
export function createDriverSocketConnect(setNewOrder) {
  const wsClient = new WebSocket(serverUrl + "driver/ws");
  wsClient.onopen = (ws) => {};
  const interval = setInterval(() => {
    wsClient.send(JSON.stringify({ type: "PingPong", data: "ping" }));
  }, 2000);
  wsClient.onmessage = (message) => {
    const msg = JSON.parse(message.data.toString());
    if (msg.type === "order") {
      setNewOrder(msg.data);
    }
  };
  wsClient.onclose = () => {
    clearInterval(interval);
  };
  return wsClient;
}

export function sendLocationWS(ws, location) {
  const payload = {
    type: "location",
    data: location,
  };
  ws.send(JSON.stringify(payload));
}

export function updateDriverStatusWS(ws, status) {
  const payload = {
    type: "pratner_status",
    data: { status },
  };
  ws.send(JSON.stringify(payload));
}

export function approveOrderWS(ws, orderID) {
  const payload = {
    type: "status",
    data: {
      orderID: orderID,
      status: "PREPARING",
    },
  };
  ws.send(JSON.stringify(payload));
}

export function rejectOrderWS(ws, orderID) {
  const payload = {
    type: "status",
    data: {
      orderID: orderID,
      status: "REJECTED",
    },
  };
  ws.send(JSON.stringify(payload));
}
export function setOrderToDeliveringWS(ws, orderID) {
  const payload = {
    type: "status",
    data: {
      orderID: orderID,
      status: "DELIVERING",
    },
  };
  ws.send(JSON.stringify(payload));
}

export function setOrderToDeliveredWS(ws, orderID) {
  const payload = {
    type: "status",
    data: {
      orderID: orderID,
      status: "DELIVERED",
    },
  };
  ws.send(JSON.stringify(payload));
}

export function getDriverLocationWS(ws, driverID) {
  const payload = {
    type: "get_driver_location",
    data: {
      driverID,
    },
  };
  ws.send(JSON.stringify(payload));
}
