import type { Location } from "../LocationsPage/LocationsPage";
import { loadItemFromListOrApi } from "../../utils/loaders";

const API_LOCATIONS = "https://rickandmortyapi.com/api/location";

export const locationLoader = ({ params }: { params: { id?: string } }) => {
  const id = params.id ?? "";
  
  return {
    location: loadItemFromListOrApi<Location>({
      listCacheKey: "locations",
      itemId: id,
      itemCacheKeyPrefix: "location",
      apiBaseUrl: API_LOCATIONS,
    }),
  };
}
