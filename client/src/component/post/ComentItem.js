import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";

import { removeComment } from "../../redux/actions/postActions";

export const ComentItem = ({ comment, postId, yes }) => {
  const authState = useSelector((state) => state.authReducer);
  //const profileState = useSelector((state) => state.profileReducer);
  const postState = useSelector((state) => state.postReducer);

  const dispatch = useDispatch();

  console.log(comment.userImage);
  return (
    <div className='comment-item-Container mt-4'>
      <div className='coment-item-user-image'>
        <img
          alt='boah'
          src={
            comment.userImage
              ? process.env.PUBLIC_URL + `/image/${comment.userImage}`
              : "data:image/jpeg;base64,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"
          }
          className='img-1'
        ></img>
      </div>
      <div className='uerpsuedo'>
        <p style={{ color: "white" }}>{comment.userPsuedo}</p>
      </div>

      <div className='comment-item-text'>
        <h5 className='move' style={{ color: "white" }}>
          {comment.comment}
        </h5>
      </div>
      <p className='cura'>
        Posted on <Moment format='YYYY/MM/DD'>{comment.createdAt}</Moment>
      </p>
      {!authState.loading &&
      !postState.loading &&
      authState.user._id === comment.user ? (
        <i
          style={{ color: "white" }}
          class='fas fa-trash-alt blaf'
          onClick={() => dispatch(removeComment(postId, comment._id))}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
};
// <i class='far fa-user'></i>
