import { useLoaderData, Await } from "react-router-dom";
import { type Location } from "../LocationsPage/LocationsPage";
import { isLoaderError, type LoaderErrorPayload } from "../../utils/loaders";
import { Suspense } from "react"

export const LocationPage = () => {
  const { location: locationPromise } = useLoaderData<{
    location: Promise<Location | LoaderErrorPayload>;
  }>();

  return (
    <>
      <h1>Location</h1>
      <Suspense fallback={<h2>Загрузка...</h2>}>
        <Await resolve={locationPromise}>
        {(location) => {
            if (isLoaderError(location)) throw location;
            console.log(location);
            return (
              <div>
                <h2>{location.name}</h2>
                <p>Type: {location.type}</p>
                <p>Dimension: {location.dimension}</p>
                <p>Created: {new Date(location.created).toLocaleString('ru-RU')}</p>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}