import { Link, useLoaderData } from "react-router-dom";

export interface LocationData {
  id: number,
  name: string,
  type: string,
  dimension: string,
  created: string
}

export const LocationsPage = () => {
  const locations = useLoaderData<LocationData[]>();
  return (
    <>
      <h1>Locations</h1>
      {locations.map((location: LocationData) => (
        <div key={location.id}>
          <Link to={`${location.id}`}>
            <h2>{location.name}</h2>
          </Link>
        </div>
      ))}
    </>
  );
}