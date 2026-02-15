import type { LocationData } from "./LocationsPage";

export const locationsLoader = async (): Promise<LocationData[]> => {
  const response = await fetch('/data/location.json')
  const data = (await response.json()) as LocationData[];

  return data;
};