import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { RootLayout } from "./routes/RootLayout/RootLayout";
import { ErrorPage } from "./routes/ErrorPage/ErrorPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index
          lazy={async () => {
            const module = await import('./routes/HomePage/HomePage');
            return { element: <module.HomePage /> };
          }}
        />
        <Route
          path="characters"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('./routes/CharactersPage/CharactersPage'),
              import('./routes/CharactersPage/CharactersPage.loader'),
            ]);
            return {
              element: <PrivateRoute><pageModule.CharactersPage /></PrivateRoute>,
              loader: loaderModule.charactersLoader,
            };
          }}
        />
        <Route
          path="characters/:id"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('./routes/CharacterPage/CharacterPage'),
              import('./routes/CharacterPage/CharacterPage.loader')
            ]);
            return {
              element: <PrivateRoute><pageModule.CharacterPage /></PrivateRoute>,
              loader: ({ params }: { params: { id?: string } }) =>
                loaderModule.characterLoader(params.id ?? ''),
            };
          }}
        />
        <Route
          path="locations"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('./routes/LocationsPage/LocationsPage'),
              import('./routes/LocationsPage/LocationsPage.loader')
            ])

            return {
              element: <PrivateRoute><pageModule.LocationsPage /></PrivateRoute>,
              loader: loaderModule.locationsLoader,
            };
          }}
        />
        <Route
          path="locations/:id"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('./routes/LocationPage/LocationPage'),
              import('./routes/LocationPage/LocationPage.loader'),
            ]);
            return {
              element: <PrivateRoute><pageModule.LocationPage /></PrivateRoute>,
              loader: ({ params }: { params: { id?: string } }) =>
                loaderModule.locationLoader(params.id ?? ''),
            };
          }}
        />
        <Route
          path="episodes"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('./routes/EpisodesPage/EpisodesPage'),
              import('./routes/EpisodesPage/EpisodesPage.loader'),
            ]);
            return {
              element: <PrivateRoute><pageModule.EpisodesPage /></PrivateRoute>,
              loader: loaderModule.episodesLoader,
            };
          }}
        />
        <Route
          path="episodes/:id"
          lazy={async () => {
            const [pageModule, loaderModule] = await Promise.all([
              import('./routes/EpisodePage/EpisodePage'),
              import('./routes/EpisodePage/EpisodePage.loader'),
            ]);
            return {
              element: <PrivateRoute><pageModule.EpisodePage /></PrivateRoute>,
              loader: ({ params }: { params: { id?: string } }) =>
                loaderModule.episodeLoader(params.id ?? ''),
            };
          }}
        />
      </Route>
      <Route
        path="/login"
        lazy={async () => {
          const module = await import('./routes/LoginPage/LoginPage');
          return { element: <module.LoginPage /> };
        }}
      />
      <Route
        path="*"
        lazy={async () => {
          const module = await import('./routes/NotFoundPage/NotFoundPage');
          return { element: <module.NotFoundPage /> };
        }}
      />
    </>
  )
);
