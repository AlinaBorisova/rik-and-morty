import { type CharacterData } from "../CharactersPage/CharactersPage";

export const characterLoader = async (id: string): Promise<CharacterData> => {
  try {
    const response = await fetch('/data/characters.json');
    const data = (await response.json()) as CharacterData[];

    const findCharacter = data.find((character: CharacterData) => character.id === Number(id));
    if (!findCharacter) throw new Response('Not Found', { status: 404 });

    return findCharacter;

  } catch (error) {
    throw new Response('Not Found', { status: 404 });
  }
};  