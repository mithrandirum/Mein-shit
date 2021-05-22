import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./component/layout/landing";
import Navbar from "./component/layout/navbar";
import { NotFound } from "./component/layout/NotFound";
import Login from "./component/layout/auth/Login";
import Register from "./component/layout/auth/register";
import React, { useEffect } from "react";
import { loadUser } from "./redux/actions/authActions";

import { useDispatch } from "react-redux";
import { setToken } from "./utils/setAuthToken";
import Profile from "./component/profile/Profile";
import { PrivateRoute } from "./component/routing/privateRoute";
import { UpdateUser } from "./component/profile/update-user";
import { UpdateProfile } from "./component/profile/update-profile";
import Profiles from "./component/profiles.js/Profiles";

import { ProfileForm } from "./component/profile/create-profile-form";
import { BrowsePost } from "./component/post/browsePost/BrowsePost";
import ProfileId from "./component/profile/profileId";

if (localStorage.token) {
  setToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <Route exact component={Navbar} />
      <div className='image'></div>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:profileId/:userId' component={ProfileId} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/update-profile' component={UpdateProfile} />
        <PrivateRoute exact path='/post/:postId' component={BrowsePost} />
        <PrivateRoute
          exact
          path='/edit-profile/:profileId'
          component={UpdateUser}
        />
        <Route component={NotFound} />
      </Switch>

      {/* <Container></Container> */}
    </Router>
  );
};
export default App;
