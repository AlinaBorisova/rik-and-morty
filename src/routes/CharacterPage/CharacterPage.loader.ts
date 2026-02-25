import type { CharacterData } from "../CharactersPage/CharactersPage";
import { loadJsonItem } from "../../utils/loaders";

export const characterLoader = (id: string) => {
  return loadJsonItem<CharacterData>("/data/characters.json", id);
}
