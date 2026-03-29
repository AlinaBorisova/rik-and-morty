import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <>
          <h1>Упс...</h1>
          <p>Такая страница не найдена</p>
        </>
      )
    } else {
      return (
        <>
          <h1>Ошибка {error.status}</h1>
          <p>{error.statusText || "Что-то пошло не так"}</p>
        </>
      )
    }
  }

  return (
    <>
      <h1>Ошибка</h1>
      <p>Что-то пошло не так</p>
    </>
  );
}
