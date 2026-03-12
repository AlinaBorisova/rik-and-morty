import type { Episode } from "../model";
import { loadItemFromListOrApi } from "../../../shared/lib/loaders";
import { EPISODE_API_BASE } from "./constants";
import { loadJsonArray, runLoader } from "../../../shared/lib/loaders";
import { CACHE_TTL_MS, cachedAsync } from "../../../shared/lib/cache";
import type { ApiPaginatedResponse } from "../../../shared/types/api";

export const episodeLoader = ({ params }: { params: { id?: string } }) => {
  const id = params.id ?? "";
  return {
    episode: loadItemFromListOrApi<Episode>({
      listCacheKey: "episodes",
      itemId: id,
      itemCacheKeyPrefix: "episode",
      apiBaseUrl: EPISODE_API_BASE,
    }),
  };
};

export const episodesLoader = () => {
  const episodesPromise = runLoader(() =>
    cachedAsync("episodes", CACHE_TTL_MS, () =>
      loadJsonArray<ApiPaginatedResponse<Episode>>(EPISODE_API_BASE)
    )
  );

  return {
    episodes: episodesPromise,
  };
};