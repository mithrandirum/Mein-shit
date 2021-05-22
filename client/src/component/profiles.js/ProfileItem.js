import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { getProfileById, getProfile } from "../../redux/actions/profileActions";
import { deleteUser } from "../../redux/actions/authActions";
import { getProfiles } from "./../../redux/actions/profileActions";
import { loadUser } from "./../../redux/actions/authActions";

const ProfileItem = ({
  profile: {
    description,
    social: { facebook, youtube, instagram },
    user: { psuedo, _id },
    image,
  },
  profileId,
  history,
}) => {
  // console.log(role);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadUser());
  //   dispatch(getProfiles());
  //   dispatch(getProfile());
  // });

  //const role = useSelector((state) => state.authReducer.user.role);
  const authState = useSelector((state) => state.authReducer);
  const profileState = useSelector((state) => state.profileReducer);
  // const authloading = useSelector((state) => state.authReducer);

  // console.log(role);
  const dawg = () => {
    console.log(_id, profileId);
    dispatch(getProfileById(profileId));

    //dispatch(getUsertPostsById(_id));

    history.push(`/profile/${profileId}/${_id}`);
  };

  const compo = (
    <div className='profile-item'>
      {authState.loading || profileState.loading ? null : (authState.user !==
          null &&
          authState.user._id === _id &&
          authState.isAuthenticated) ||
        (authState.user && authState.user.role === "admin") ? (
        <Button
          className='del btn-danger'
          onClick={() => dispatch(deleteUser(_id))}
        >
          Delete User
        </Button>
      ) : (
        ""
      )}

      <div className='small'>
        <img
          alt='em'
          className='image-item'
          src={image && process.env.PUBLIC_URL + `/image/${image}`}
        ></img>

        <h3 className='mt-2' style={{ textAlign: "center", color: "white" }}>
          {psuedo}
        </h3>
        <p
          className='item-description'
          style={{ color: "white", fontSize: "large" }}
        >
          {description}
        </p>
      </div>
      <div className='button-icon'>
        <div claaName='icons'>
          <a href={instagram}>
            <i class='fab fa-instagram' style={{ color: "white" }}></i>
          </a>
          <a href={youtube}>
            <i class='fab fa-youtube' style={{ color: "white" }}></i>
          </a>
          <a href={facebook}>
            <i class='fab fa-facebook-square' style={{ color: "white" }}></i>
          </a>
        </div>
        <Button onClick={() => dawg()} className='ml-3 mt-4'>
          browse profile
        </Button>
      </div>
    </div>
  );

  return authState.loading || profileState.loading ? (
    <h1>loading...</h1>
  ) : (
    compo
  );
};

export default ProfileItem;
