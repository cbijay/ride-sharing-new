import Auth from "features/auth/components/Auth";
import useLogin from "features/auth/hooks/components/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const { handleLogin } = useLogin();

  return (
    <Auth
      title="Login"
      onSuccess={handleLogin}
      text="signin_with"
      footer={
        <p className="text-sm italic" role="paragraph">
          Don't have account? <Link to="/signup">Signup</Link>
        </p>
      }
    />
  );
};

export default Login;
