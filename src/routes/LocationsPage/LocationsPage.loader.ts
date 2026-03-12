import type { Location } from "./LocationsPage";
import { loadJsonArray, runLoader}  from "../../shared/lib/loaders";
import type { ApiPaginatedResponse } from "../../shared/types/api";
import { CACHE_TTL_MS, cachedAsync } from "../../shared/lib/cache";

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