export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : window.location.origin;
