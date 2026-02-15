import type { LocationData } from "../LocationsPage/LocationsPage";

export const locationLoader = async (id: string): Promise<LocationData> => {
  try {
    const response = await fetch('/data/location.json');
    const data = (await response.json()) as LocationData[];

    const findLocation = data.find((location: LocationData) => location.id === Number(id));
    if (!findLocation) throw new Response('Not Found', { status: 404 });

    return findLocation;
  } catch (error) {
    throw new Response('Not Found', { status: 404 });
  }
}