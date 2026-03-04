import { Link, useLoaderData } from "react-router-dom";
import style from './CharactersPage.module.css';
import { useState, useRef, useCallback, useTransition } from "react";

export interface CharacterData {
  results: {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image: string,
    created: string,
  }[],

  info: {
    count: number,
    next: string | null,
    pages: number
  }
}

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
  const rawData = useLoaderData<CharacterData | undefined>();
  const initialData = rawData ?? { results: [], info: { count: 0, next: null, pages: 0 } };
  const [characters, setCharacters] = useState(initialData.results ?? []);
  const [nextPage, setNextPage] = useState(initialData.info?.next ?? null);
  const [isPending, startTransition] = useTransition();
  const [loadError, setLoadError] = useState<string | null>(null);
  const isLoadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (!nextPage || isLoadingRef.current || isPending || loadError) return;
    isLoadingRef.current = true;
    setLoadError(null);

    try {
      const response = await fetch(nextPage);
      if (!response.ok) {
        if (response.status === 429) {
          setLoadError('Слишком много запросов. Подождите немного и нажмите «Повторить».');
        } else {
          setLoadError(`Ошибка загрузки: ${response.status}`);
        }
        isLoadingRef.current = false;
        return;
      }

      const data: CharacterData = await response.json();

      startTransition(() => {
        setCharacters(prev => [...prev, ...data.results]);
        setNextPage(data.info.next);
      });
    } catch (error) {
      setLoadError('Не удалось загрузить. Проверьте интернет или попробуйте позже.');
      return;
    }
    finally {
      isLoadingRef.current = false;
    }
  }, [nextPage, isPending, loadError]);

  const observer = useRef<IntersectionObserver>(null);
  const lastNodeRef = useCallback((node: HTMLDivElement) => {
    if (!node) {
      observer.current?.disconnect();
      observer.current = null;
      return;
    }

    observer.current?.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries.length === 0) return;
      if (entries[0].isIntersecting) loadMore();
    }, { rootMargin: '0px 0px 500px 0px' });

    observer.current.observe(node);
  }, [loadMore]);

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
      {isPending && <div>Loading...</div>}
      {loadError && (<p>{loadError}</p>)}
      <div ref={lastNodeRef} style={{ opacity: 0 }}></div>
    </>
  );
}