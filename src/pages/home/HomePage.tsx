import { Link } from "react-router-dom";
import style from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={style.page}>
      <section className={style.hero}>
        <h1 className={style.title}>Rick and Morty</h1>
        <p className={style.subtitle}>
          Исследуй вселенную: герои, локации и эпизоды
        </p>
        <img
          src="/assets/images/home-img.jpg"
          alt="Rick and Morty"
          className={style.heroImage}
        />
      </section>

      <p className={style.intro}>
        Добро пожаловать в энциклопедию мультсериала «Рик и Морти». Здесь можно
        посмотреть персонажей, планеты и эпизоды — всё из открытой API вселенной.
      </p>

      <nav className={style.cards} aria-label="Разделы приложения">
        <Link to="/characters" className={style.card}>
          <h2 className={style.cardTitle}>Герои</h2>
          <p className={style.cardDesc}>
            Персонажи мультсериала: Рик, Морти и остальные
          </p>
        </Link>
        <Link to="/locations" className={style.card}>
          <h2 className={style.cardTitle}>Локации</h2>
          <p className={style.cardDesc}>
            Планеты, измерения и места действия
          </p>
        </Link>
        <Link to="/episodes" className={style.card}>
          <h2 className={style.cardTitle}>Эпизоды</h2>
          <p className={style.cardDesc}>
            Все сезоны и серии с описаниями
          </p>
        </Link>
      </nav>
    </div>
  );
};
