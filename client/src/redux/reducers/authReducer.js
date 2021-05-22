import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCESS,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "../actions/types";

const intialState = {
  user: null,
  loading: true,
  isAuthenticated: null,
  token: localStorage.getItem("token"),
};

export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case USER_UPDATE_SUCCESS:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case USER_UPDATE_FAILED:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: null,
        loading: false,
        user: null,
      };

    case DELETE_USER_FAIL:
    case LOGOUT_FAIL:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        user:
          state.user._id === payload && state.user.role !== "admin"
            ? null
            : state.user,
        loading: false,
        isAthuenticated:
          state.user._id === payload && state.user.role !== "admin"
            ? null
            : true,

        loading: false,
      };

    default:
      return state;
  }
}
