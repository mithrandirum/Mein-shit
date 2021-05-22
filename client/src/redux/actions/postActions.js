import axios from "axios";
import {
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_SUCCESS_POST,
  ADD_COMMENT_FAIL,
  ADD_LIKE_FAIL,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_SUCCESS_USER_POSTS,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_SUCCESS_USER_POSTS,
  REMOVE_LIKE_FAIL,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAIL,
  REMOVE_COMMENT_SUCCESS_USER_POST,
  REMOVE_COMMENT_FAIL_USER_POST,
  GET_USER_POSTS_BYID_SUCCESS,
  GET_USER_POSTS_BYID_FAIL,
} from "./types";

import { setAlert } from "./alertActions";

export const addPost = (file, text, e) => async (dispatch) => {
  //   const config = {
  //     "Content-Type": "application/json",
  //   };

  e.preventDefault();

  var bodyFormData = new FormData();

  bodyFormData.append("file", file);
  bodyFormData.append("text", text);

  try {
    const res = await axios.post("http://localhost:5000/post", bodyFormData);

    console.log(res.data);

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: res.data,
    });

    //   dispatch({
    //     type: GET_PROFILE,
    //     payload: res.data,
    //   });

    //   //dispatch(getProfile());

    dispatch(setAlert("Post Added", "success"));

    //   history.push("./profile");

    //   console.log(res.data);
  } catch (err) {
    console.log(err);

    dispatch({
      type: CREATE_POST_FAIL,
    });
    //   dispatch({
    //     type: PROFILE_ERROR,
    //   });

    //   dispatch(setAlert(error.response.data.errors[0], "danger"));
  }
};

//get post by id

export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/post/post/${postId}`);

    dispatch({
      type: GET_POST_SUCCESS,
      payload: res.data,
    });

    console.log(res.data);
  } catch (error) {
    console.error(error);

    dispatch({
      type: GET_POST_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/post/posts");

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: GET_POSTS_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

//get user posts

export const getUsertPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/post/user-posts");

    dispatch({
      type: GET_USER_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: GET_USER_POSTS_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

//get userPosts by id of the field user

export const getUsertPostsById = (profileUserId) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/post/${profileUserId}`);

    dispatch({
      type: GET_USER_POSTS_BYID_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error);

    dispatch({
      type: GET_USER_POSTS_BYID_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

//add comment by post Id

export const addComment = (comment, postId, which) => async (dispatch) => {
  try {
    const config = {
      "Content-Type": "application/json",
    };
    const res = await axios.put(
      `http://localhost:5000/post/add-comment/${postId}`,
      { comment },
      config
    );
    if (which === "userPosts") {
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: ADD_COMMENT_SUCCESS_POST,
        payload: res.data,
      });
    }

    console.log(res.data);
  } catch (error) {
    console.error(error);

    dispatch({
      type: ADD_COMMENT_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

export const addLike = (postId, which) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/post/add-like/${postId}`
    );

    if (which === "userPosts") {
      dispatch({
        type: ADD_LIKE_SUCCESS_USER_POSTS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: ADD_LIKE_SUCCESS,

        payload: res.data,
      });
      console.log(res.data);
    }
  } catch (error) {
    console.error(error);

    //dispatch(setAlert("user already liked this post", "danger"));

    dispatch({
      type: ADD_LIKE_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

export const removeLike = (postId, userId, which) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/post/remove-like/${postId}`
    );

    dispatch({
      type: REMOVE_LIKE_SUCCESS_USER_POSTS,
      payload: { postId, userId },
    });

    // if (which === "userPosts") {
    //   dispatch({
    //     type: REMOVE_LIKE_SUCCESS_USER_POSTS,
    //     payload: { data: res.data, userId },
    //   });
    // } else {
    //   dispatch({
    //     type: REMOVE_LIKE_SUCCESS,
    //     payload: res.data,
    //   });
    // }
  } catch (error) {
    console.error(error);

    dispatch(setAlert("you cannot disliking this awsome post", "danger"));

    dispatch({
      type: REMOVE_LIKE_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

//remove post
export const removePost = (postId, history) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/post/post/${postId}`);

    dispatch({
      type: REMOVE_POST_SUCCESS,
      payload: postId,
    });

    // history.push("/profile");
  } catch (error) {
    console.error(error);

    // dispatch(setAlert("couldnot remove post", "danger"));

    dispatch({
      type: REMOVE_POST_FAIL,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/post/remove-comment/${postId}/${commentId}`
    );

    dispatch({
      type: REMOVE_COMMENT_SUCCESS_USER_POST,
      payload: { postId, commentId },
    });
  } catch (error) {
    console.error(error);

    // dispatch(setAlert("couldnot remove post", "danger"));

    dispatch({
      type: REMOVE_COMMENT_FAIL_USER_POST,
    });

    // dispatch(setAlert(error.response.data, "danger"));
  }
};
