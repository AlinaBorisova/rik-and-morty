import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./routes/RootLayout/RootLayout";
import { ErrorPage } from "./routes/ErrorPage/ErrorPage";
import { HomePage } from "./routes/HomePage/HomePage";
import { charactersLoader } from "./routes/CharactersPage/CharactersPage.loader";

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
      }
    ]
  }
]);