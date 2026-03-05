import { useLoaderData } from "react-router-dom";
import style from './CharacterPage.module.css';
import { type Character } from "../CharactersPage/CharactersPage";
import { isLoaderError, type LoaderErrorPayload } from "../../utils/loaders";

export const CharacterPage = () => {
  const data = useLoaderData<Character | LoaderErrorPayload>();
  if (isLoaderError(data)) throw data;
  const character = data;
  
  return (
    <>
      <h1>Character</h1>
      <div className={style.characterContainer}>
        <div className={style.characterImage}>
          <img src={character.image} alt={character.name} />
        </div>
        <div>
          <h2 className={style.characterName}>{character.name}</h2>
          <p>Status: {character.status}</p>
          <p>Species: {character.species}</p>
          <p>Type: {character.type}</p>
          <p>Gender: {character.gender}</p>
          <p>Created: {new Date(character.created).toLocaleString('ru-RU')}</p>
        </div>
      </div>
    </>
  );
}