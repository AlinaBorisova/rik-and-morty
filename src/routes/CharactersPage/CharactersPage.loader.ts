import type { CharacterData } from "./CharactersPage";
import { loadJsonArray } from "../../utils/loaders.ts";

export const charactersLoader = () => {
  return loadJsonArray<CharacterData>("/data/characters.json");
}
