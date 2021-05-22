import axios from "axios";
//import { LOGOUT } from "../actions/types";

const api = axios.create({
  headers: {
    baseUrl: "http://localhost:5000",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // if (err.response.status === 401) {
    //   store.dispatch({ type: LOGOUT });
    // }

    return Promise.reject(err);
  }
);

export default api;
