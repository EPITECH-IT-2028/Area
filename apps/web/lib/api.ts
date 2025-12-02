import ky from "ky";

const api = ky.create({
  prefixUrl: "http://localhost:8080/",
  retry: {
    limit: 1,
  },
});

export default api;
