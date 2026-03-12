import { Suspense } from "react";
import { NavLink, Outlet, ScrollRestoration, useNavigate, useLocation } from "react-router-dom";
import style from "./RootLayout.module.css";
import { useAuth } from "../../../features/auth";
import ErrorBoundary from "../../../shared/ui/error-boundary/ErrorBoundary";

export const RootLayout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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
          <ErrorBoundary key={location.pathname}>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </main>
      <ScrollRestoration />
    </div>
  )
}