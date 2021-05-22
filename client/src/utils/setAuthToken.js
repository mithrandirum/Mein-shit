import axios from "axios";

export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.authorization = `Bearer ${token}`;

    //req.headers.authorization.startsWith("Bearer")
  } else {
    delete axios.headers.authorization.token;
  }
};
