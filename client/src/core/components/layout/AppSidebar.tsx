import classNames from "classnames";
import AppLogo from "core/components/logo/AppLogo";
import useAppSidebar from "core/hooks/layout/useAppSidebar";
import { toggleSidebar } from "core/store/sidebar/reducer/sidebar.reducer";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  const { sidebarItems, role, pathname, isShowSidebar, dispatch } =
    useAppSidebar();

  return (
    <div
      className={classNames(
        "absolute z-[1000] h-full left-0 flex-col w-full bg-white py-6 px-4 border-r border-slate-300 shadow-xl lg:max-w-[220px] lg:flex lg:relative",
        isShowSidebar ? "flex max-w-[calc(100%-50%)]" : "hidden"
      )}
    >
      <div className="flex">
        <AppLogo className="mt-4 mb-16 mx-auto" />
        <FaTimes
          fontSize={20}
          className="lg:hidden cursor-pointer hover:text-primary"
          onClick={() => dispatch(toggleSidebar(!isShowSidebar))}
        />
      </div>

      <div>
        {sidebarItems &&
          sidebarItems.map(
            ({ icon, title, link, scope }, index) =>
              scope.includes(role && role) && (
                <div key={index}>
                  <Link
                    to={link}
                    className={`flex flex-row items-center px-4 py-2 text-base font-normal hover:bg-primary rounded-md ${
                      pathname === link ? "bg-primary" : ""
                    }`}
                  >
                    {icon}
                    {title}
                  </Link>
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default AppSidebar;
