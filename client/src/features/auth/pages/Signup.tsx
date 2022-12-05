import Card from "core/components/card/Card";

import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";
import useSignup from "../hooks/components/useSignup";

const Signup = () => {
  const { handleSignup } = useSignup();

  return (
    <Card className="max-w-[350px] w-full mt-32 mx-auto">
      <h2 className="text-gray-900 text-lg mb-2 font-medium title-font">
        Signup
      </h2>

      <div className="mb-4">
        <GoogleLogin
          text="signup_with"
          onSuccess={(success) => handleSignup(success)}
          width="270px"
          allowed_parent_origin={process.env.REACT_APP_BASE_URL}
        />
      </div>
      <p className="text-sm italic">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </Card>
  );
};

export default Signup;
