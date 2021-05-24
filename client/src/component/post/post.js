import React from "react";
import Button from "react-bootstrap/Button";
import "./styles.css";
import { ComentItem } from "./ComentItem";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPost } from "../../redux/actions/postActions";
import {
  addComment,
  addLike,
  removeLike,
  removePost,
} from "../../redux/actions/postActions";

import Moment from "react-moment";

export const Post = ({
  history,
  post: { text, image, likes, comments, _id, createdAt, user },
}) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getPost();
  }, [dispatch]);

  const postState = useSelector((state) => state.postReducer);
  const profileState = useSelector((state) => state.profileReducer);
  const authState = useSelector((state) => state.authReducer);

  const [openComment, setOpenComment] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(comment, _id, "userPosts"));
    setComment("");
  };

  console.log(postState);

  const click = () => {
    dispatch(getPost(_id));
    history.push(`/post/${_id}`);
  };

  const compo = (
    <>
      <div className='this'>
        <img
          alt='boaya'
          className='image-post'
          src={image && process.env.PUBLIC_URL + `/postImage/${image}`}
        ></img>
        <div className='inner-section-2'>
          <p className='title' style={{ padding: "10px" }}>
            {text}
          </p>

          <div className='comment-2'>
            {authState.user._id === user ? (
              <Button
                className='mr-4'
                onClick={() => dispatch(removePost(_id))}
                className='btn-danger dng'
              >
                {" "}
                delete post{" "}
              </Button>
            ) : (
              ""
            )}

            <form>
              <textarea
                className='input-post-2'
                placeholder='add comment'
                onChange={(e) => setComment(e.target.value)}
              />
            </form>
          </div>

          <Link
            className='link-button-3'
            style={{ textDecoration: "none" }}
            onClick={() => click()}
          >
            browse Post
          </Link>

          <div className='like-2'>
            <h3
              className='point'
              onClick={() => dispatch(addLike(_id, "userPosts"))}
            >
              <i
                className='far fa-thumbs-up'
                style={{ width: "15px", height: "16px", padding: "0px" }}
                // onClick={dispatch(addLike(_id))}
              >
                <bold>{likes.length === 0 ? null : likes.length}</bold>{" "}
              </i>
            </h3>
            <h3
              className='point'
              onClick={() => {
                dispatch(removeLike(_id, authState.user._id));
              }}
            >
              <i
                style={{ height: "16px", width: "15px", marginLeft: "5px" }}
                className='far fa-thumbs-down'
              >
                {" "}
                <bold></bold>
              </i>
            </h3>
          </div>
          <Link
            className='link-button-2'
            value={comment}
            //to={`#/${_id}`}
            style={{ textDecoration: "none" }}
            onClick={(e) => onSubmit(e)}
          >
            add a comment
          </Link>
          <p className='created-2'>
            Created At{" "}
            <Moment format='YYYY/MM/DD'>
              {postState && !postState.loading && createdAt}
            </Moment>
          </p>
        </div>

        <Button
          className='mb-4'
          onClick={() => setOpenComment(!openComment)}
          disabled={comments.length === 0 && true}
        >
          <label> {comments.length === 0 ? "No" : ""}</label> discussions
          {"  "}
          <labal className={comments.length === 0 ? "" : "jesus"}>
            {comments.length === 0 ? "" : comments.length}
          </labal>
        </Button>
      </div>
      {openComment && (
        <ul className=''>
          {comments.map((comment, index) => (
            <li key={index}>
              <ComentItem comment={comment} postId={_id} />
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return postState.loading ? <h1>fucking ayy</h1> : compo;
};
