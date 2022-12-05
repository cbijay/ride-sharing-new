import classNames from "classnames";
import useAutoComplete from "features/booking/hooks/components/autocomplete/useAutoComplete";
import { FC, FormEvent } from "react";

export type TAutocomplete = {
  inputRef?: any;
  handlePlace?: Function;
  value?: HTMLInputElement["value"];
  handleChange: Function;
  placeholder: string;
  className?: string;
  name?: string;
  error: any;
};

const Autocomplete: FC<TAutocomplete> = ({
  inputRef,
  value,
  handleChange,
  placeholder,
  handlePlace,
  className,
  name,
  error,
}) => {
  const { places, getPlaces, showList, setShowList } = useAutoComplete();

  return (
    <div className={classNames("relative", className)}>
      <input
        name={name}
        type="text"
        className="border w-full rounded-md py-2 px-2"
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        onChange={(event: FormEvent<HTMLInputElement>) => {
          getPlaces(event);
          places && places.length > 0 && handleChange();
        }}
      />

      {error && name && error[name] !== "" && (
        <p role="alert" className="text-red-500 mt-2">
          {error[name]}
        </p>
      )}

      {places && places?.length > 0 && (
        <div
          className={`bg-white shadow rounded-md ${
            !showList ? "hidden" : "overflow-auto max-h-[150px] h-auto"
          } absolute left-0 right-0 `}
        >
          {places &&
            places.map((place: any, index: number) => (
              <li
                key={index}
                onClick={() => {
                  handlePlace && handlePlace(place);
                  setShowList(false);
                }}
                className="list-none px-3 py-1 hover:bg-primary hover:cursor-pointer rounded-md"
              >
                {place?.label}
              </li>
            ))}
        </div>
      )}
    </div>
  );
};
export default Autocomplete;
