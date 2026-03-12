import type { Character } from "../CharactersPage/CharactersPage";
import { loadItemFromListOrApi } from "../../shared/lib/loaders";

const API = "https://rickandmortyapi.com/api/character";

export const characterLoader = ({ params }: { params: { id?: string } }) => {
  const id = params.id ?? "";
  return {
    character: loadItemFromListOrApi<Character>({
      listCacheKey: "characters",
      itemId: id,
      itemCacheKeyPrefix: "character",
      apiBaseUrl: API,
    }),
  };
};