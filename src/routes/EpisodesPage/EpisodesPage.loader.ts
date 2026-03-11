import type { Episode } from "./EpisodesPage";
import { loadJsonArray, runLoader } from "../../utils/loaders";
import { CACHE_TTL_MS, cachedAsync } from "../../utils/cache";
import type { ApiPaginatedResponse } from "../../types/api";

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