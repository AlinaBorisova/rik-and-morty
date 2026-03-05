import { Link, useLoaderData } from "react-router-dom";
import style from './CharactersPage.module.css';
import { isLoaderError, type LoaderErrorPayload } from "../../utils/loaders";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import type { ApiPaginatedResponse } from "../../types/api";

export interface Character {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  image: string,
  created: string,
}

export const CharactersPage = () => {
  const rawData = useLoaderData<ApiPaginatedResponse<Character> | LoaderErrorPayload | undefined>()
  const fallback = { results: [] as Character[], info: { count: 0, next: null, pages: 0 } };
  const initialData = isLoaderError(rawData) ? fallback : (rawData ?? fallback);
  const { items: characters, lastNodeRef, isPending, isLoadingMore, loadError } = useInfiniteScroll<Character>(
    initialData.results ?? [],
    initialData.info?.next ?? null
  );
  
  if (isLoaderError(rawData)) throw rawData;

  return (
    <>
      <h1>Characters</h1>
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