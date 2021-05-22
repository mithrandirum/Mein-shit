import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

export const PrivateProfileRoute = ({ component: Component, ...rest }) => {
  const profile = useSelector((state) => state.profileReducer);

  return (
    <Route
      {...rest}
      render={(props) =>
        !profile.profile && !profile.loading ? (
          <Redirect to={"/create-profile"} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
