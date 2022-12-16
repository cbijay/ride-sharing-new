import { FC } from "react";

import { GoogleLogin } from "@react-oauth/google";
import Card from "core/components/card/Card";
import { TAuth } from "features/auth/types/TAuth";

export const Auth: FC<TAuth> = ({ title, onSuccess, text, footer }) => {
  return (
    <Card className="max-w-[350px] w-full mt-64 mx-auto">
      {title && (
        <h2 className="text-gray-900 text-lg mb-2 font-medium title-font">
          {title}
        </h2>
      )}

      <div className="mb-4">
        <div id="google-login">
          <GoogleLogin
            text={text}
            onSuccess={(success) => onSuccess(success)}
            width="270px"
            type="standard"
            allowed_parent_origin={process.env.REACT_APP_BASE_URL}
          />
        </div>
      </div>

      {footer && footer}
    </Card>
  );
};

export default Auth;
