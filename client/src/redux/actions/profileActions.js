import {
  //PROFILE_LOADED,
  PROFILE_ERROR,
  // AUTH_ERROR,
  // USER_LOADED,
  IMAGE_UPLOADED,
  UPLOAD_FAILED,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  //Empty_PROFILE,
  GET_PROFILE,
  PROFILE_DELETE_SUCCESS,
  PROFILE_DELETE_FAILED,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  GET_PROFILE_BYID_SUCCESS,
  GET_PROFILE_BYID_FAIL,
} from "./types";
import axios from "axios";
import { setAlert } from "./alertActions";
import { loadUser } from "./authActions";
import store from "../../store";

export const createProfile = (profileData, history) => async (dispatch) => {
  const config = {
    "Content-Type": "application/json",
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/profile/create",
      profileData,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    //dispatch(getProfile());

    dispatch(setAlert("Profile Created Successfuly", "success"));

    // history.push("./profile");

    console.log(res.data);
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
    });

    // dispatch(setAlert(error.response.data.errors[0], "danger"));
  }
};

export const getProfile = () => async (dispatch) => {
  try {
    //const headers = { Authorization: `Bearer ${localStorage.token}` };
    const res = await axios.get("http://localhost:5000/profile/me");

    if (store.getState().authReducer.isAuthenticated) {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    }
    dispatch(loadUser());
  } catch (err) {
    //dispatch(setAlert(err.response.data.errors[0], "danger"));
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

export const getProfileById = (profileId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/profile/${profileId}`);

    dispatch({
      type: GET_PROFILE_BYID_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_PROFILE_BYID_FAIL,
    });
  }
};

export const uploadImage = (file) => async (dispatch) => {
  var bodyFormData = new FormData();

  bodyFormData.append("file", file);

  try {
    const res = await axios.post(
      "http://localhost:5000/profile/image",
      bodyFormData
    );

    dispatch({
      type: IMAGE_UPLOADED,
      payload: res.data,
    });

    dispatch(setAlert("image uploaded Succesfully", "success"));
  } catch (error) {
    dispatch({
      type: UPLOAD_FAILED,
    });

    if (error.response.data.errors)
      dispatch(setAlert(error.response.data.errors[0], "danger"));
  }
};

//update profile

export const profileUpdate = (formData, history) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };
    const res = await axios.put(
      "http://localhost:5000/profile/update",
      formData,
      config
    );

    dispatch({
      type: UPDATE_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert("profile updated succesfully", "success"));

    setTimeout(() => history.push("profile"), 1000);
    // dispatch(getProfile());
  } catch (err) {
    dispatch({
      type: UPDATE_FAIL,
    });

    dispatch(setAlert(err.response.data, "danger"));
  }
};

//delete profile by its id
export const deleteProfile = (profileId, history) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/profile/delete/${profileId}`);

    dispatch({
      type: PROFILE_DELETE_SUCCESS,
    });

    dispatch(setAlert("account deleted successfully", "success"));

    setTimeout(history.push("/create-profile"));
  } catch (err) {
    dispatch({
      type: PROFILE_DELETE_FAILED,
    });

    // dispatch(
    //   setAlert(
    //     err.response.data.errors.map((err) => err),
    //     "danger"
    //   )
    // );
  }
};

//get profiles

export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/profile/profiles`);

    dispatch({
      type: GET_PROFILES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROFILES_FAIL,
    });
  }
};
