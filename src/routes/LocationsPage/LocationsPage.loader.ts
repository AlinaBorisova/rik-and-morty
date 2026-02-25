import type { LocationData } from "./LocationsPage";
import { loadJsonArray}  from "../../utils/loaders.ts";

export const locationsLoader = () => {
  return loadJsonArray<LocationData>("/data/location.json");
}
