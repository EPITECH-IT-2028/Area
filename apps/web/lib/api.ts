import ky from "ky";

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/",
  retry: {
    limit: 1,
  },
});

export default api;
