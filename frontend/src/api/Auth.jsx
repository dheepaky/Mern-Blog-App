import axios from "axios";
import { API_BASE_URL } from "../baseurl/BaseUrl";

export const getAuthUser = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/auth/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};
