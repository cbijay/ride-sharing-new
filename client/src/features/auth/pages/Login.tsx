import Card from "core/components/card/Card";
import useAuth from "features/auth/hooks/components/useLogin";

import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useAuth(true);

  return (
    <Card className="max-w-[350px] w-full mt-32 mx-auto">
      <h2 className="text-gray-900 text-lg mb-2 font-medium title-font">
        Login
      </h2>

      <div className="mb-4">
        <GoogleLogin
          text="signin_with"
          onSuccess={(success) => handleLogin(success)}
          width="270px"
          allowed_parent_origin={process.env.REACT_APP_BASE_URL}
        />
      </div>

      <p className="text-sm italic">
        Don't have account? <Link to="/signup">Signup</Link>
      </p>
    </Card>
  );
};

export default Login;
