import type { Location } from "./LocationsPage";
import { loadJsonArray, runLoader}  from "../../utils/loaders.ts";
import type { ApiPaginatedResponse } from "../../types/api.ts";
import { CACHE_TTL_MS, cachedAsync } from "../../utils/cache.ts";

export const locationsLoader = () => {
  const locationsPromise = runLoader(() =>
    cachedAsync("locations", CACHE_TTL_MS, () =>
      loadJsonArray<ApiPaginatedResponse<Location>>("https://rickandmortyapi.com/api/location")
    )
  );

  return {
    locations: locationsPromise,
  };
};