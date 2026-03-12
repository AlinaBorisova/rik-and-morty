import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { isLoaderError, type LoaderErrorPayload } from "../../shared/lib/loaders";
import { useInfiniteScroll } from "../../shared/lib/useInfiniteScroll";
import type { ApiPaginatedResponse } from "../../shared/types/api";
import type { Location } from "../../entities/location";



export const LocationsPage = () => {
  const { locations: locationsPromise } = useLoaderData() as {
    locations: Promise<ApiPaginatedResponse<Location> | LoaderErrorPayload>;
  };
  return (
    <>
      <h1>Locations</h1>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Await resolve={locationsPromise}>
          {(data) => {
            if (isLoaderError(data)) throw data;
            return <LocationsList initialData={data} />;
          }}
        </Await>
      </Suspense>
    </>
  );
};

export const LocationsList = ({ initialData }: { initialData: ApiPaginatedResponse<Location> }) => {
  const { items: locations, lastNodeRef, isPending, isLoadingMore, loadError } = useInfiniteScroll<Location>(
    initialData.results ?? [],
    initialData.info?.next ?? null
  );
  
  return (
    <>
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