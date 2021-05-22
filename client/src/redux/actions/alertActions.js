import { SET_ALERT, REMOVE_ALERT } from "./types";

const { uuid } = require("uuidv4");

export const setAlert =
  (msg, alertype, timeout = 5000) =>
  (dispatch) => {
    window.scrollTo(0, 0);
    const id = uuid();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertype, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
