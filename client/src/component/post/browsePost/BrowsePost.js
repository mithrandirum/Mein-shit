import React from "react";
import Button from "react-bootstrap/Button";
import "./BrowsePost.css";
import { ComentItem } from "../ComentItem";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../../../redux/actions/postActions";
import {
  addComment,
  addLike,
  removeLike,
  //removePost,
} from "../../../redux/actions/postActions";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Moment from "react-moment";

import { loadUser } from "./../../../redux/actions/authActions";

export const BrowsePost = ({ history }) => {
  const postId = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
    dispatch(getPost(postId.postId));
  }, [dispatch, postId.postId]);

  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");

  console.log(postId);

  // const deletePost = () => {
  //   window.confirm("are you sure you want to delete this post");

  //   dispatch(removePost(postId.postId, history));
  // };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(comment, postId.postId, e));
    setComment(" ");
  };

  const postState = useSelector((state) => state.postReducer);
  //const profileState = useSelector((state) => state.profileReducer);
  const authState = useSelector((state) => state.authReducer);

  const alertSate = useSelector((state) => state.alertReducer);

  const compo = (
    <>
      {/* <Link
        style={{ marginTop: "50px", lineDecoration: "none" }}
        className='baaack'
        to='/profile'
      >
        back to Profile
      </Link> */}

      <div className='whats'>
        {alertSate.length > 0 &&
          alertSate.map((alert, index) => (
            <Alert key={index} variant={alert.alertype} className='mt-5'>
              {alert.msg}
            </Alert>
          ))}
      </div>

      <div className='container-post'>
        <Button
          className='btn-dark horse'
          onClick={() => history.push("/profile")}
        >
          back to Profile
        </Button>
        <img
          className='image-post'
          alt='what'
          src={
            authState.loading || postState.loading ? null : postState.post[0] &&
              postState.post[0].image.length > 0 ? (
              process.env.PUBLIC_URL +
              `/postImage/${
                authState.loading || postState.loading
                  ? null
                  : postState.post[0] && postState.post[0].image.length > 0
                  ? postState.post[0].image
                  : "photo_609a83ed28a3ae2f9457954a.jpg"
              }`
            ) : (
              <p>no image</p>
            )
          }
        ></img>
        <div className='inner-section'>
          <h2 className='title'>
            {authState.loading || postState.loading
              ? null
              : postState.post[0] &&
                postState.post !== null &&
                postState.post[0].text}
          </h2>

          <form classname='fuck'>
            <textarea
              className='input-post'
              placeholder='add comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
          <div className='near'>
            <Button className='btn-dark' onClick={(e) => onSubmit(e)}>
              add comment
            </Button>
          </div>

          <div className='like'>
            <i
              class='far fa-thumbs-up'
              style={{ color: "white" }}
              onClick={() => dispatch(addLike(postState.post[0]._id))}
            >
              {" "}
              <bold
                className={
                  authState.loading || postState.loading
                    ? null
                    : postState.post[0] && postState.post[0].likes.length === 0
                    ? ""
                    : "shy"
                }
              >
                {authState.loading || postState.loading
                  ? null
                  : postState.post[0] && postState.post[0].likes.length === 0
                  ? null
                  : authState.loading || postState.loading
                  ? null
                  : postState.post[0] && postState.post[0].likes.length}
              </bold>
            </i>

            <i
              class='far fa-thumbs-down'
              onClick={() => dispatch(removeLike(postState.post[0]._id))}
              style={{ color: "white" }}
            >
              {" "}
              <bold></bold>
            </i>
          </div>
          <p className='created'>
            Created At{" "}
            <Moment format='YYYY/MM/DD'>
              {authState.loading || postState.loading
                ? null
                : postState.post[0] && postState.post[0].createdAt}
            </Moment>
          </p>
        </div>
        {/* {authState.loading || postState.loading ? null : postState.post[0]
            .user === profileState.profile.user ? (
          <Button onClick={() => deletePost()} className='btn-danger dng'>
            {" "}
            delete post{" "}
          </Button>
        ) : (
          ""
        )} */}
      </div>

      <div className='comment-section'>
        <Button
          className='boston-2 mb-4'
          onClick={() => setOpenComment(!openComment)}
          disabled={
            authState.loading || postState.loading
              ? null
              : postState.post[0] &&
                postState.post[0].comments.length === 0 &&
                true
          }
        >
          {openComment ? "Close " : "Open "}discussions{"  "}
          <labal className='jesus'>
            {authState.loading || postState.loading
              ? null
              : postState.post[0] && postState.post[0].comments.length}
          </labal>
        </Button>
        <ul
          className='ul'
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          {authState.loading || postState.loading
            ? null
            : openComment && postState.post[0].comments.length > 0
            ? postState.post[0].comments.map((comment) => (
                <li
                  style={{ width: "50%", marginLeft: "18%" }}
                  key={comment._id}
                >
                  <ComentItem
                    comment={comment}
                    key={comment._id}
                    postId={postId.postId}
                    yes={true}
                  />
                </li>
              ))
            : openComment && (
                <h4 className='boston'>No comments...literally</h4>
              )}
        </ul>
      </div>
    </>
  );

  return authState.loading || postState.loading ? (
    <Spinner animation='border' className='aa' />
  ) : (
    <div>
      <div className='father'>{compo}</div>
    </div>
  );
};
