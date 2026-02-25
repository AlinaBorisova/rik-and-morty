import type { LocationData } from "../LocationsPage/LocationsPage";
import { loadJsonItem } from "../../utils/loaders";

export const locationLoader = (id: string) => {
  return loadJsonItem<LocationData>("/data/location.json", id);
}
