import AppLogo from "core/components/logo/AppLogo";
import useAppSidebar from "core/hooks/layout/useAppSidebar";
import { Link } from "react-router-dom";

const AppSidebar = () => {
  const { sidebarItems, role, pathname } = useAppSidebar();

  return (
    <div className="lg:max-w-[220px] lg:flex flex-col w-full bg-white py-6 px-4 hidden">
      <AppLogo className="mt-4 mb-16 mx-auto" />

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
