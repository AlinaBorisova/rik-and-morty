import { useLoaderData } from "react-router-dom";
import style from './CharacterPage.module.css';
import { type CharacterData } from "../CharactersPage/CharactersPage";

export const CharacterPage = () => {
  const character = useLoaderData<CharacterData>();

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