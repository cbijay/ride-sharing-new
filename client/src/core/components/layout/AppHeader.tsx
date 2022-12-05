import Avatar from "core/components/avatar/Avatar";
import { logout } from "core/store/auth/reducer/auth.reducer";
import { FaPowerOff } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Button from "../buttons/Button";

const AppHeader = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row items-center justify-end mb-4">
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
  );
};

export default AppHeader;
