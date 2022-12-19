import { ROLE } from "core/components/route/enum/Role";
import ProtectedRoute from "core/components/route/ProtectedRoute";
import { RootState } from "core/store";

import Login from "features/auth/pages/Login";
import Signup from "features/auth/pages/Signup";
import BookingDetail from "features/booking/pages/BookingDetail";
import BookRide from "features/booking/pages/BookRide";

import History from "features/booking/pages/History";
import RiderRequest from "features/booking/pages/RiderRequest";
import { default as Dashboard } from "features/dashboard/pages/Dashboard";

import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";

const useAppRoute = () => {
  const { isLoggedIn, role } = useSelector((state: RootState) => state.user);

  return useRoutes([
    {
      path: "/",
      element: isLoggedIn ? <Navigate to={`${role}/dashboard`} /> : <Login />,
    },
    {
      path: "/signup",
      element: isLoggedIn ? <Navigate to={`${role}/dashboard`} /> : <Signup />,
    },
    {
      path: "/user",
      children: [
        {
          path: "dashboard",
          element: <ProtectedRoute component={Dashboard} roles={[ROLE.User]} />,
        },
        {
          path: "book-ride",
          element: <ProtectedRoute component={BookRide} roles={[ROLE.User]} />,
        },
        {
          path: "bookings",
          element: <ProtectedRoute component={History} roles={[ROLE.User]} />,
        },
      ],
    },
    {
      path: "/bookings/:id",
      element: <ProtectedRoute component={BookingDetail} roles={[ROLE.User]} />,
    },
    {
      path: "/rider",
      children: [
        {
          path: "dashboard",
          element: (
            <ProtectedRoute component={Dashboard} roles={[ROLE.Rider]} />
          ),
        },
        {
          path: "bookings",
          element: <ProtectedRoute component={History} roles={[ROLE.Rider]} />,
        },
      ],
    },
    {
      path: "/booking/request",
      element: <RiderRequest />,
    },
  ]);
};

export default useAppRoute;
