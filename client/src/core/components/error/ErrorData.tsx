import Card from "core/components/card/Card";
import { FC, ReactNode } from "react";

export type TErrorData = {
  icon: ReactNode;
  title: string;
  message: string;
};

const ErrorData: FC<TErrorData> = ({ icon, title, message }) => {
  return (
    <div className="flex flex-col justify-center h-full">
      <Card className="mx-auto max-w-sm w-full text-center px-16 py-16">
        {icon}
        {title && (
          <h3 className="text-md font-medium italic mb-3 text-center">
            {title}
          </h3>
        )}
        {message && (
          <p className="max-w-xs w-full mx-auto font-light italic">{message}</p>
        )}
      </Card>
    </div>
  );
};

export default ErrorData;
