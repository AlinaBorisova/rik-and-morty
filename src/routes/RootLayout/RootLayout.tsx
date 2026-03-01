import { Suspense } from "react";
import { NavLink, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import style from "./RootLayout.module.css";
import { useAuth } from "../../context/AuthProvider";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

export const RootLayout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (auth) {
      navigate("/", { replace: true });

      setTimeout(() => {
        auth.signout(() => {
          console.log("Сессия завершена");
        });
      }, 100);
    }
  };

  return (
    <div className={style.layout}>
      <header className={style.header}>
        <nav className={style.nav}>
          <NavLink to='/'>Главная</NavLink>
          <NavLink to='/characters'>Герои</NavLink>
          <NavLink to='/locations'>Локации</NavLink>
          <NavLink to='/episodes'>Эпизоды</NavLink>
          {auth?.user ? (
            <div className={style.userInfo}>
              <span>{auth.user}</span>
              <button onClick={handleLogout} className={style.logoutBtn}>
                Выйти
              </button>
            </div>
          ) : (
            <NavLink to="/login">Вход</NavLink>
          )}
        </nav>
      </header>
      <main>
        <Suspense fallback={<h2>Загрузка страницы</h2>}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
      <ScrollRestoration />
    </div>
  )
}