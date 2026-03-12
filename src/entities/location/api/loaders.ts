import type { Location } from "../model";
import { loadItemFromListOrApi, loadJsonArray, runLoader } from "@/shared/lib/loaders";
import { CACHE_TTL_MS, cachedAsync } from "@/shared/lib/cache";
import type { ApiPaginatedResponse } from "@/shared/types/api";
import { LOCATION_API_BASE } from "./constants";

export const locationLoader = ({ params }: { params: { id?: string } }) => {
  const id = params.id ?? "";
  
  return {
    location: loadItemFromListOrApi<Location>({
      listCacheKey: "locations",
      itemId: id,
      itemCacheKeyPrefix: "location",
      apiBaseUrl: LOCATION_API_BASE,
    }),
  };
}

export const locationsLoader = () => {
  const locationsPromise = runLoader(() =>
    cachedAsync("locations", CACHE_TTL_MS, () =>
      loadJsonArray<ApiPaginatedResponse<Location>>(LOCATION_API_BASE)
    )
  );

  return {
    locations: locationsPromise,
  };
};