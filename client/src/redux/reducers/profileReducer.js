import {
  PROFILE_LOADED,
  // PROFILE_ERROR,
  IMAGE_UPLOADED,
  UPLOAD_FAILED,
  Empty_PROFILE,
  UPDATE_FAIL,
  UPDATE_SUCCESS,
  GET_PROFILE,
  PROFILE_DELETE_SUCCESS,
  PROFILE_DELETE_FAILED,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  LOGOUT_SUCCESS,
  GET_PROFILE_BYID_SUCCESS,
  GET_PROFILE_BYID_FAIL,
  DELETE_USER_SUCCESS,
} from "./../actions/types";
import store from "../../store";

const initialState = {
  profile: null,
  loading: true,
  profiles: null,
  errors: {},
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_LOADED:
    case UPDATE_SUCCESS:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    // case PROFILE_ERROR:
    case Empty_PROFILE:
      return {
        ...state,
        loading: false,
        profile: null,
        profiles: null,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILE_BYID_FAIL:
    case PROFILE_DELETE_FAILED:
    case UPLOAD_FAILED:
    case UPDATE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case PROFILE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: null,
      };

    case IMAGE_UPLOADED:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: payload,
      };
    case GET_PROFILES_FAIL:
      return {
        ...state,
        profiles: null,
        loading: false,
      };

    case LOGOUT_SUCCESS:
      return {
        profile: null,
        profiles: null,
        loading: false,
      };
    case GET_PROFILE_BYID_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
      };

    case DELETE_USER_SUCCESS:
      console.log(payload);
      return {
        profiles: state.profiles.filter(
          (profile) => profile.user._id !== payload
        ),
        // profile:
        //   state.profile.user._id === payload
        //     ? (state.profile = null)
        //     : state.profile,
        // loading: false,
        // isAuthenticated:
        //   state.profile.user._id === payload
        //     ? (state.isAuthenticated = null)
        //     : true,

        // ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default profileReducer;
