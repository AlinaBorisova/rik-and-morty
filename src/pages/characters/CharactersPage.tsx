import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import style from './CharactersPage.module.css';
import { isLoaderError, type LoaderErrorPayload } from "@/shared/lib/loaders";
import { useInfiniteScroll } from "@/shared/lib/useInfiniteScroll";
import type { ApiPaginatedResponse } from "@/shared/types/api";
import type { Character } from "@/entities/character";

export const CharactersPage = () => {
  const { characters: charactersPromise } = useLoaderData() as {
    characters: Promise<ApiPaginatedResponse<Character> | LoaderErrorPayload>;
  };
  return (
    <>
      <h1>Characters</h1>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Await resolve={charactersPromise}>
          {(data) => {
            if (isLoaderError(data)) throw data;
            return <CharactersList initialData={data} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};

export const CharactersList = ({ initialData }: { initialData: ApiPaginatedResponse<Character> }) => {
  const { items: characters, lastNodeRef, isPending, isLoadingMore, loadError } = useInfiniteScroll<Character>(
    initialData.results ?? [],
    initialData.info?.next ?? null
  );
  
  return (
    <>
      {characters.map((character: Character) => (
        <div key={character.id}>
          <Link to={`${character.id}`} className={style.characterCard}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
          </Link>
        </div>
      ))}
      {(isPending || isLoadingMore) && <h2>Загрузка...</h2>}
      {loadError && (<p>{loadError}</p>)}
      <div ref={lastNodeRef} style={{ opacity: 0 }}></div>
    </>
  );
}