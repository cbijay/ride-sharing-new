import { ROLE } from "core/components/route/enum/Role";
import { RootState } from "core/store";
import { ComponentType } from "react";

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import LoadingSpinner from "core/components/loading/LoadingSpinner";
import UnAuthorized from "core/components/unauthorized/UnAuthorized";

const ProtectedRoute = ({
  component: Component,
  roles,
}: {
  component: ComponentType;
  roles: Array<ROLE>;
}) => {
  const { isLoggedIn, role } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const userHasRequiredRole =
    isLoggedIn && (Object.values(roles) as string[]).includes(role)
      ? true
      : false;

  if (isLoggedIn === undefined) {
    return <LoadingSpinner />;
  } else if (isLoggedIn && userHasRequiredRole) {
    return <Component />;
  } else if (isLoggedIn && !userHasRequiredRole) {
    return <UnAuthorized />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
