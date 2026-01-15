import Cookies from "js-cookie";
import ky from "ky";

const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/",
  retry: {
    limit: 1,
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get("access_token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401) {
          console.log("Token expired!");
        }
      },
    ],
  },
});

export default api;
