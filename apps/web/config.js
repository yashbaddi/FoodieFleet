const config = {
  api: {
    url: import.meta.env.APP_API_URL || "http://localhost:8001/api/",
    wsURL: import.meta.env.APP_WS_URL || "ws://localhost:8001/api/",
  },
};

export default config;
