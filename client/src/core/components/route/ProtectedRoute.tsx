import { ROLE } from "core/components/route/enum/Role";
import { ComponentType } from "react";

import UnAuthorized from "core/components/unauthorized/UnAuthorized";
import { RootState } from "core/store";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

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

  if (isLoggedIn && userHasRequiredRole) {
    return <Component />;
  } else if (isLoggedIn && !userHasRequiredRole) {
    return <UnAuthorized />;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default ProtectedRoute;
