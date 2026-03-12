import { useLoaderData, Await } from "react-router-dom";
import style from './CharacterPage.module.css';
import type { Character } from "@/entities/character";
import { isLoaderError, type LoaderErrorPayload } from "@/shared/lib/loaders";
import { Suspense } from "react";

export const CharacterPage = () => {
  const { character: characterPromise } = useLoaderData<{
    character: Promise<Character | LoaderErrorPayload>;
  }>();

  return (
    <>
      <h1>Character</h1>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Await resolve={characterPromise}>
          {(character) => {
            if (isLoaderError(character)) throw character;
            return (
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
            );
          }}
        </Await>
      </Suspense>
    </>
  );
};