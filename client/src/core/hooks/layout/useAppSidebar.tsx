import { RootState } from "core/store";
import { FaClock, FaHome, FaSuitcaseRolling } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

const useAppSidebar = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const { pathname } = useLocation();
  const { isShowSidebar } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  const sidebarItems = [
    {
      icon: <FaHome className="mr-2" fontSize={20} />,
      title: "Dashboard",
      link: `/user/dashboard`,
      scope: ["user"],
    },
    {
      icon: <FaHome className="mr-2" fontSize={20} />,
      title: "Dashboard",
      link: `/rider/dashboard`,
      scope: ["rider"],
    },
    {
      icon: <FaSuitcaseRolling className="mr-2" fontSize={18} />,
      title: "Book ride",
      link: "/user/book-ride",
      scope: ["user"],
    },
    {
      icon: <FaClock className="mr-2" fontSize={16} />,
      title: "History",
      link: `/${role.toLocaleLowerCase()}/bookings`,
      scope: ["user", "rider"],
    },
  ];

  return { sidebarItems, role, pathname, isShowSidebar, dispatch };
};

export default useAppSidebar;
