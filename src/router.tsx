import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./routes/RootLayout/RootLayout";
import { ErrorPage } from "./routes/ErrorPage/ErrorPage";
import { HomePage } from "./routes/HomePage/HomePage";
import { charactersLoader } from "./routes/CharactersPage/CharactersPage.loader";
import { characterLoader } from "./routes/CharacterPage/CharacterPage.loader";
import { CharacterPage } from "./routes/CharacterPage/CharacterPage";
import { locationsLoader } from "./routes/LocationsPage/LocationsPage.loader";
import { LocationPage } from "./routes/LocationPage/LocationPage";
import { locationLoader } from "./routes/LocationPage/LocationPage.loader";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'characters',
        lazy: async () => {
          const module = await import('./routes/CharactersPage/CharactersPage')
          return {
            element: <module.CharactersPage />
          }
        },
        loader: charactersLoader,
      },
      {
        path: 'characters/:id',
        element: <CharacterPage />,
        loader: (args) => {
          const id = args.params.id;
          return characterLoader(id ?? '');
        },
      },
      {
        path: 'location',
        lazy: async () => {
          const module = await import('./routes/LocationsPage/LocationsPage')
          return {
            element: <module.LocationsPage />
          }
        },
        loader: locationsLoader,
      },
      {
        path: 'locations/:id',
        element: <LocationPage />,
        loader: (args) => {
          const id = args.params.id;
          return locationLoader(id ?? '');
        },
      },
    ]
  }
]);