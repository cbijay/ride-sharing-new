import { LocationIQProvider } from "leaflet-geosearch";
import { FormEvent, useState } from "react";

const useAutoComplete = () => {
  const [places, setPlaces] = useState<[]>();
  const [showList, setShowList] = useState(true);

  const provider = new LocationIQProvider({
    params: {
      key: process.env.REACT_APP_MAP_PROVIDER_KEY!,
      countrycodes: "np",
      addressdetails: 1,
    },
  });

  const getPlaces = async (event: FormEvent<HTMLInputElement>) => {
    setShowList(true);

    const value = event.currentTarget.value;
    if (value.length > 3) {
      const results: any = await provider.search({
        query: value,
      });

      setPlaces(results);
    }
  };

  return { getPlaces, places, showList, setShowList };
};

export default useAutoComplete;
