import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { getProfile } from "../../redux/actions/profileActions";
import { Link } from "react-router-dom";
import { AddPost } from "./../post/AddPost";
//import { Rabbi } from "../post/Rabbi";
import { getUsertPosts } from "../../redux/actions/postActions";
import { Post } from "../post/post";
import Alert from "react-bootstrap/Alert";

const Profile = ({ history }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authState = useSelector((state) => state.authReducer);
  const profileState = useSelector((state) => state.profileReducer);
  const postState = useSelector((state) => state.postReducer);
  const alertState = useSelector((state) => state.alertReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(history));
    dispatch(getUsertPosts());
    //dispatch(getPosts());
  }, [dispatch]);

  // const spinner = (
  //   <div className='center'>
  //     <Container>
  //       <Spinner animation='border' className='lg' />
  //     </Container>
  //   </div>
  // );

  const compo = (
    <>
      <div className='alright'>
        <div className='alluring'>
          {alertState.length > 0 &&
            alertState.map((alert, index) => (
              <Alert key={index} variant={alert.alertype} className='mt-5'>
                {alert.msg}
              </Alert>
            ))}
        </div>

        <div className='hope'>
          {authState.loading || profileState.loading ? null : (
            <AddPost
              show={show}
              handleClose={handleClose}
              handleShow={handleShow}
            />
          )}

          {authState.loading || profileState.loading ? null : (
            <h2 style={{ fontWeight: "bold" }} className='welcome'>{`Welcome ${
              authState.user && !authState.loading && authState.user.psuedo
            }`}</h2>
          )}

          {authState.loading || profileState.loading ? null : (
            <Button
              className='dark mt-4 ml-4'
              onClick={() =>
                history.push(`/edit-profile/${profileState.profile._id}`)
              }
              style={{ fontWeight: "bold" }}
            >
              Edit User Info
            </Button>
          )}

          {authState.loading || profileState.loading ? null : (
            <Button className='btn-success mt-4 ml-4' onClick={handleShow}>
              Add a Post
            </Button>
          )}
        </div>

        <div className='card'>
          <div className='card-background'>
            <img
              className='card-background'
              alt='rpg'
              src={
                authState.loading || profileState.loading
                  ? null
                  : profileState.profile && profileState.profile.image
                  ? `${process.env.FILE_UPLOAD_PATH_PROFILE}/photo_${
                      // profileState.loading && authState.user === null
                      //   ? ""
                      //   : !profileState.loading &&
                      //     !authState.loading &&
                      //     authState.user &&
                      authState.user._id
                    }.${"jpg" || "png"}`
                  : ""
              }
            />
          </div>
          <div className='card-info-4'>
            <h2 className='mt-2'>
              {authState.loading || profileState.loading
                ? "user"
                : profileState.profile !== null &&
                  profileState.profile.user.psuedo}
            </h2>
            <br />
            <p>
              {authState.loading || profileState.loading
                ? null
                : profileState.profile !== null &&
                  profileState.profile.description}
            </p>
          </div>
          <div class='card-social-icons-2'>
            {
              <Link
                to={
                  authState.loading || profileState.loading
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
                authState.loading || profileState.loading
                  ? null
                  : profileState.profile !== null &&
                    profileState.profile.social.youtube
              }
            >
              <i class='fab fa-youtube'></i>
            </Link>
            <Link
              href={
                authState.loading || profileState.loading
                  ? null
                  : profileState.profile !== null &&
                    profileState.profile.social.facebook
              }
            >
              <i class='fab fa-facebook-square'></i>
            </Link>
          </div>

          {authState.loading || profileState.loading ? null : (
            <Button
              onClick={() => history.push("/update-profile")}
              className='cadre'
              style={{ fontWeight: "bold" }}
            >
              Edit Profile{" "}
            </Button>
          )}
        </div>

        <ul className='nothing' style={{ left: "13%", width: "50%" }}>
          {!authState.loading &&
          !postState.loading &&
          postState.userPosts !== null &&
          postState.userPosts.length > 0 ? (
            postState.userPosts.map((post) => (
              <Post post={post} key={post._id} history={history} />
            ))
          ) : (
            <h4
              className='mt-4 ml-5'
              style={{ textAlign: "center", color: "white" }}
            >
              {" "}
              you don't have any posts yet...
            </h4>
          )}
        </ul>
      </div>
    </>
  );

  const go = (
    <div style={{ marginTop: "150px", marginLeft: "100px" }}>
      <Container>
        <h1>you dont have a profile yet </h1>
        <Button
          className='btn-success'
          onClick={() => history.push("/create-profile")}
        >
          create a profile
        </Button>
      </Container>
    </div>
  );

  if (
    !profileState.loading &&
    !authState.loading &&
    profileState.profile === null
  ) {
    return go;
  }

  return !profileState.loading && profileState.profile === null ? (
    go
  ) : profileState.loading ? (
    <h1 style={{ marginTop: "200px", marginLeft: "50px" }}>loading...</h1>
  ) : (
    compo
  );

  // return authState.loading || profileState.loading ? (
  //   <h2 className='' style={{ marginTop: "100px" }}>
  //     loading...
  //   </h2>
  // ) : profileState.profile === null ? (
  //   go
  // ) : (
  //   compo
  // );
};

export default Profile;
