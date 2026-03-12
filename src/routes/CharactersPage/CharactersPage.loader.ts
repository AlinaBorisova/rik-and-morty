import type { Character } from "./CharactersPage";
import { loadJsonArray, runLoader } from "../../shared/lib/loaders";
import { CACHE_TTL_MS, cachedAsync } from "../../shared/lib/cache";
import type { ApiPaginatedResponse } from "../../shared/types/api";

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