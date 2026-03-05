import type { Character } from "../CharactersPage/CharactersPage";
import { loadItemFromListOrApi } from "../../utils/loaders";

const API = "https://rickandmortyapi.com/api/character";

export const characterLoader = (id: string) =>
  loadItemFromListOrApi<Character>({
    listCacheKey: "characters",
    itemId: id,
    itemCacheKeyPrefix: "character",
    apiBaseUrl: API,
  });