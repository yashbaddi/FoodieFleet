const config = {
  api: {
    url: "/api/",
    wsURL: `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${window.location.host}/api/`,
  },
};

export default config;
