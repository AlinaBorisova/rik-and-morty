import type { Episode } from "./EpisodesPage";
import { loadJsonArray, runLoader } from "../../shared/lib/loaders";
import { CACHE_TTL_MS, cachedAsync } from "../../shared/lib/cache";
import type { ApiPaginatedResponse } from "../../shared/types/api";

export const episodesLoader = () => {
  const episodesPromise = runLoader(() =>
    cachedAsync("episodes", CACHE_TTL_MS, () =>
      loadJsonArray<ApiPaginatedResponse<Episode>>("https://rickandmortyapi.com/api/episode")
    )
  );

  return {
    episodes: episodesPromise,
  };
};