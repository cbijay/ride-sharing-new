import { Link } from "react-router-dom";
import Auth from "../components/Auth";
import useSignup from "../hooks/components/useSignup";

const Signup = () => {
  const { handleSignup } = useSignup();

  return (
    <Auth
      title="Signup"
      onSuccess={handleSignup}
      text="signup_with"
      footer={
        <p className="text-sm italic" role="paragraph">
          Already have an account? <Link to="/">Login</Link>
        </p>
      }
    />
  );
};

export default Signup;
