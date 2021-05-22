import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getProfileById } from "./../../redux/actions/profileActions";
import { getUsertPostsById } from "../../redux/actions/postActions";
import { Post } from "../post/post";
import { loadUser } from "../../redux/actions/authActions";

const ProfileId = ({ history }) => {
  const authState = useSelector((state) => state.authReducer);
  const profileState = useSelector((state) => state.profileReducer);
  const postState = useSelector((state) => state.postReducer);

  const id = useParams();

  // const profileId = profileState.profile._id;
  // const userId = postState.userPosts.user._id;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(id);
    dispatch(loadUser());
    dispatch(getProfileById(id.profileId));
    dispatch(getUsertPostsById(id.userId));
  }, [dispatch, id]);

  const compo = (
    <>
      <div className='alright-2'>
        {authState.loading ||
        profileState.loading ||
        !profileState.profile ? null : (
          <h2 style={{ fontWeight: "bold" }} className='welcome'>{`${
            profileState.profile &&
            !authState.loading &&
            profileState.profile.user.psuedo
          }'s profile`}</h2>
        )}

        <div className='card-2'>
          <div className='card-background'>
            <img
              className='card-background'
              alt='ee'
              src={
                profileState.loading || !profileState.profile
                  ? null
                  : profileState.profile && profileState.profile.image
                  ? process.env.PUBLIC_URL +
                    `/image/photo_${
                      profileState.loading
                        ? ""
                        : !profileState.loading && profileState.profile.user._id
                    }.jpg`
                  : ""
              }
            />
          </div>
          <div className='card-info-2' style={{ top: "50%" }}>
            <h1 className='mt-2' style={{ color: "white" }}>
              {profileState.loading || !profileState.profile
                ? "user"
                : profileState.profile !== null &&
                  profileState.profile.user.psuedo}
            </h1>
            <br />
            <h2>
              {profileState.loading || !profileState.profile
                ? null
                : profileState.profile !== null &&
                  profileState.profile.description}
            </h2>
          </div>
          <div class='card-social-icons'>
            {
              <Link
                to={
                  profileState.loading || !profileState.profile
                    ? null
                    : profileState.profile !== null &&
                      profileState.profile.social.instagram
                }
              >
                <i class='fab fa-instagram'></i>
              </Link>
            }
            <Link
              to={
                profileState.loading || !profileState.profile
                  ? null
                  : profileState.profile !== null &&
                    profileState.profile.social.youtube
              }
            >
              <i class='fab fa-youtube'></i>
            </Link>
            <Link
              to={
                profileState.loading || !profileState.profile
                  ? null
                  : profileState.profile !== null &&
                    profileState.profile.social.facebook
              }
            >
              <i class='fab fa-facebook-square'></i>
            </Link>
          </div>
        </div>
        <ul
          className='nothing'
          style={{ width: "50%", fontSize: "large", left: "12%" }}
        >
          {!authState.loading &&
          !postState.loading &&
          postState.userPosts !== null &&
          postState.userPosts.length > 0 ? (
            postState.userPosts.map((post) => (
              <Post post={post} key={post._id} history={history} />
            ))
          ) : (
            <h4
              className='mt-4'
              style={{
                textAlign: "center",
                color: "white",
                marginLeft: "45rem",
              }}
            >
              {" "}
              user does not have any posts yet...
            </h4>
          )}
        </ul>
      </div>
    </>
  );

  //  return profileState.profile ? profileState.loading ? <Spinner /> : compo : go;
  // return !authState.loading &&
  //   authState.user &&
  //   !authState.loading &&
  //   !profileState.loading &&
  //   profileState.profile
  //   ? compo
  //   : !authState.loading && !profileState.loading && go;

  return profileState.loading ? (
    <h2 className='mt-4 ml-4'>loading...</h2>
  ) : (
    compo
  );
};

export default ProfileId;
