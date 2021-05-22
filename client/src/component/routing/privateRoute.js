import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.authReducer);

  return (
    <Route
      {...rest}
      render={(props) =>
        !auth.isAuthenticated && !auth.loading ? (
          <Redirect to={"/login"} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
