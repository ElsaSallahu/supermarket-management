import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) =>
    Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest =
      error.config;

    if (
      error.response?.status ===
        403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );

        const res =
          await axios.post(
            "http://localhost:5000/api/auth/refresh",
            {
              refreshToken,
            }
          );

        const newToken =
          res.data.accessToken;

        localStorage.setItem(
          "token",
          newToken
        );

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(
          originalRequest
        );
      } catch (err) {
        console.log(
          "Refresh token failed"
        );

        localStorage.clear();

        window.location.href =
          "/login";
      }
    }

    return Promise.reject(
      error
    );
  }
);

export default api;