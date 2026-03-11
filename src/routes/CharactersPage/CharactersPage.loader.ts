import type { Character } from "./CharactersPage";
import { loadJsonArray, runLoader } from "../../utils/loaders.ts";
import { CACHE_TTL_MS, cachedAsync } from "../../utils/cache.ts";
import type { ApiPaginatedResponse } from "../../types/api.ts";

export const charactersLoader = () => {
  const charactersPromise = runLoader(() =>
    cachedAsync("characters", CACHE_TTL_MS, () =>
      loadJsonArray<ApiPaginatedResponse<Character>>("https://rickandmortyapi.com/api/character")
    )
  );
  
  return {
    characters: charactersPromise,
  };
};