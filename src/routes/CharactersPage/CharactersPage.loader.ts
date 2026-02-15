import type { CharacterData } from "./CharactersPage";

export const charactersLoader = async (): Promise<CharacterData[]> => {
  try {
    const response = await fetch('/data/characters.json')
    const data = (await response.json()) as CharacterData[];

    return data;
  } catch (error) {
    throw new Response('Not Found', { status: 404 });
  }
};