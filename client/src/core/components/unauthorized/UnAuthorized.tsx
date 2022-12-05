import Button from "core/components/buttons/Button";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <div className="flex flex-col items-center justify-center self-center h-full">
        <picture className="mb-4">
          <source
            src="/images/unauthorized_illustration.webp"
            type="image/webp"
          />
          <source
            src="/images/unauthorized_illustration.svg"
            type="image/svg"
          />
          <img
            src="/images/unauthorized_illustration.svg"
            alt="Unauthorized Illustration"
            width={407}
            height={252}
          />
        </picture>
        <h3>Unauthorized</h3>
        <p className="text-center max-w-[40%]">
          The url is valid but you are not authorized for this content. Please
          contact Administrator
        </p>
        <Button onClick={() => navigate(-1)}>
          <FaArrowLeft /> Go Back
        </Button>
      </div>
    </div>
  );
};

export default UnAuthorized;
