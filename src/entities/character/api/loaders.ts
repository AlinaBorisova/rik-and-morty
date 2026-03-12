import type { Character } from "../model";
import { loadItemFromListOrApi, loadJsonArray, runLoader } from "@/shared/lib/loaders";
import { CACHE_TTL_MS, cachedAsync } from "@/shared/lib/cache";
import type { ApiPaginatedResponse } from "@/shared/types/api";
import { CHARACTER_API_BASE } from "./constants";

export const characterLoader = ({ params }: { params: { id?: string } }) => {
  const id = params.id ?? "";
  return {
    character: loadItemFromListOrApi<Character>({
      listCacheKey: "characters",
      itemId: id,
      itemCacheKeyPrefix: "character",
      apiBaseUrl: CHARACTER_API_BASE,
    }),
  };
};

export const charactersLoader = () => {
  const charactersPromise = runLoader(() =>
    cachedAsync("characters", CACHE_TTL_MS, () =>
      loadJsonArray<ApiPaginatedResponse<Character>>(CHARACTER_API_BASE)
    )
  );
  
  return {
    characters: charactersPromise,
  };
};