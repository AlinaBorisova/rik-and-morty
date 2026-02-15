import { Link, useLoaderData } from "react-router-dom";
import style from './CharactersPage.module.css';

export interface CharacterData {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  image: string,
  created: string
}

export const CharactersPage = () => {
  const characters = useLoaderData();

  return (
    <>
      <h1>Characters</h1>
      {characters.map((character: CharacterData) => (
        <div key={character.id}>
          <Link to={`/characters/${character.id}`} className={style.characterCard}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
          </Link>
        </div>
      ))}
    </>
  );
}