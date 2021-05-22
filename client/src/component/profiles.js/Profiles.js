import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import ProfileItem from "./ProfileItem";
import { getProfiles, getProfile } from "../../redux/actions/profileActions";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";

const Profiles = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getProfiles());
  }, [dispatch]);

  const profileState = useSelector((state) => state.profileReducer);
  const authState = useSelector((state) => state.authReducer);
  const alertState = useSelector((state) => state.alertReducer);

  const compo = (
    <>
      <div className='alluring'>
        {alertState.length > 0 &&
          alertState.map((alert, index) => (
            <Alert key={index} variant={alert.alertype} className='mt-5'>
              {alert.msg}
            </Alert>
          ))}
      </div>
      <div className='center-2'>
        <h1 className=' ml-4' style={{ color: "white" }}>
          Members
        </h1>
        <h2 className='mt-4 ml-4' style={{ color: "white" }}>
          <i className='fas fa-monument'></i> Browse and connect with Members
        </h2>
        <div className='flex'>
          {!profileState.loading &&
          profileState.profiles !== null &&
          profileState.profiles.length > 0 ? (
            profileState.profiles.map((profile) => (
              <ProfileItem
                className='profile-item'
                profile={profile}
                profileId={profile._id}
                key={profile._id}
                history={history}
              />
            ))
          ) : (
            <h4>No profiles found...</h4>
          )}
        </div>
      </div>
    </>
  );
  return compo;
  // return authState.loading || profileState.loading ? (
  //   <h1>loading...</h1>
  // ) : (
  //   compo
  // );
};

export default Profiles;
