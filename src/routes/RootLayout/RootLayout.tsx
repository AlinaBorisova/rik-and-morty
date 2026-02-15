import { Suspense } from "react";
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import style from "./RootLayout.module.css";

export const RootLayout = () => {
  return (
    <div className={style.layout}>
      <header className={style.header}>
        <nav>
          <NavLink to='/'>Главная</NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={<h2>Загрузка страницы</h2>}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollRestoration />
    </div>
  )
}