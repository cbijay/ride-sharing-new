import Avatar from "core/components/avatar/Avatar";
import Button from "core/components/buttons/Button";
import { RootState } from "core/store";

import { logout } from "core/store/auth/reducer/auth.reducer";
import { toggleSidebar } from "core/store/sidebar/reducer/sidebar.reducer";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const AppHeader = () => {
  const { isShowSidebar } = useSelector((state: RootState) => state.sidebar);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-row items-center justify-between mb-4 lg:justify-end">
        <Avatar
          className="w-12 h-12 p-1 flex-col self-start items-start justify-start hover:cursor-pointer lg:hidden"
          onClick={() => dispatch(toggleSidebar(!isShowSidebar))}
        >
          <BiMenuAltLeft fontSize={26} />
        </Avatar>
        <div className=" flex flex-row gap-1">
          <div className="flex flex-row gap-1 items-center">
            <Avatar className="mr-2">JD</Avatar>
            <h3 className="italic text-md">John Doe</h3>
          </div>
          <div>
            <Button onClick={() => dispatch(logout())}>
              <FaPowerOff fontSize={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
