import type { CharacterData } from "./CharactersPage";
import { loadJsonArray, runLoader } from "../../utils/loaders.ts";
import { CACHE_TTL_MS, cachedAsync } from "../../utils/cache.ts";

export const charactersLoader = () =>
  runLoader(() =>
    cachedAsync("characters", CACHE_TTL_MS, () =>
      loadJsonArray<CharacterData>("https://rickandmortyapi.com/api/character")
    )
  );
