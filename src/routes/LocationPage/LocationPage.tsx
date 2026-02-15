import { useLoaderData } from "react-router-dom";
import { type LocationData } from "../LocationsPage/LocationsPage";

export const LocationPage = () => {
  const location = useLoaderData<LocationData>();
  return (
    <>
      <h1>Location</h1>
      <h2>{location.name}</h2>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
      <p>Created: {new Date(location.created).toLocaleString('ru-RU')}</p>
    </>
  );
}