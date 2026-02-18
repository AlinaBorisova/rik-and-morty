import style from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <>
      <h1>Упс....</h1>
      <p>Страница не найдена</p>
      <Link to='/' className={style.link}>Вернуться на главную</Link>
    </>
  )
}