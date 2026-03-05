import { Link, useLoaderData } from "react-router-dom";
import { isLoaderError, type LoaderErrorPayload } from "../../utils/loaders";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import type { ApiPaginatedResponse } from "../../types/api";


export interface Location {
  id: number,
  name: string,
  type: string,
  dimension: string,
  created: string
}

export const LocationsPage = () => {
  const rawData = useLoaderData<ApiPaginatedResponse<Location> | LoaderErrorPayload | undefined>();
  const fallback = { results: [] as Location[], info: { count: 0, next: null, pages: 0 } };
  const initialData = isLoaderError(rawData) ? fallback : (rawData ?? fallback);
  const { items: locations, lastNodeRef, isPending, isLoadingMore, loadError } = useInfiniteScroll<Location>(
    initialData.results ?? [],
    initialData.info?.next ?? null
  );
  
  if (isLoaderError(rawData)) throw rawData;

  return (
    <>
      <h1>Locations</h1>
      {locations.map((location: Location) => (
        <div key={location.id}>
          <Link to={`${location.id}`}>
            <h2>{location.name}</h2>
          </Link>
        </div>
      ))}
      {(isPending || isLoadingMore) && <h2>Загрузка...</h2>}
      {loadError && (<p>{loadError}</p>)}
      <div ref={lastNodeRef} style={{ opacity: 0 }}></div>
    </>
  );
}