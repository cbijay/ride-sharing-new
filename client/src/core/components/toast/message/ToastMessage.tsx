import {
  faCheck,
  faExclamationCircle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

import { TToastMessage } from "core/types/components/toast/TToast";
import { useEffect } from "react";

export const MESSAGE_VARIANTS = {
  Info: {
    base: "bg-white border-blue-500",
    iconstyle: "text-blue-500 ",
    icon: faInfoCircle,
    name: "Info",
  },

  Error: {
    base: "bg-white border-pm ",
    iconstyle: "text-red-500",
    icon: faExclamationCircle,
    name: "Error",
  },

  Warning: {
    base: "bg-white border-yellow-500",
    iconstyle: "text-yellow-500 ",
    icon: faExclamationCircle,
    name: "Warning",
  },

  Success: {
    base: "bg-white border-s",
    iconstyle: "text-green-500 ",
    icon: faCheck,
    name: "Success",
  },
};

const ToastMessage = ({
  id,
  header,
  message,
  lifetime,
  onRemove,
  truncate = "truncate-1-lines",
  icon,
  type,
}: TToastMessage) => {
  const messageType = type
    ? MESSAGE_VARIANTS[type]
    : {
        base: "bg-w border-gray-600 ",
        iconstyle: "",
        icon: icon,
        name: header,
      };

  useEffect(() => {
    if (lifetime && onRemove) {
      setTimeout(() => {
        id && onRemove(id);
      }, lifetime);
    }
  }, [id, lifetime, onRemove]);

  return (
    <div
      className={classNames(
        "visible flex w-full flex-row shadow-lg",
        "cursor-pointer rounded-md border-l-4 duration-100",
        "hover:scale-102 transform transition-all mb-0.5",
        messageType.base,
        type && "max-h-40"
      )}
    >
      <div className="flex flex-row flex-no-wrap w-full py-3 px-3">
        {messageType.icon && (
          <div
            className={classNames(
              "flex h-12 w-12 items-center",
              "mx-auto select-none text-xl"
            )}
          >
            <FontAwesomeIcon
              className={classNames("mx-auto", messageType.iconstyle)}
              icon={messageType.icon}
            />
          </div>
        )}

        <div className="flex flex-col flex-no-wrap w-full px-1">
          <div className="flex my-auto font-bold mb-0.5">
            {messageType.name}
          </div>
          <p
            className={classNames(
              "my-auto flex break-all",
              "text-sm text-gray-600",
              typeof message === "string" && truncate
            )}
          >
            {message}
          </p>
        </div>
        <div
          onClick={() => onRemove && id && onRemove(id)}
          className={classNames(
            "mx-auto h-5 w-5 items-center justify-center",
            "text-center text-xs leading-none"
          )}
        >
          <FontAwesomeIcon
            className={classNames(
              "mx-auto my-auto h-full text-center text-success",
              "hover:scale-55 transform cursor-pointer "
            )}
            icon={faTimes}
          />
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
