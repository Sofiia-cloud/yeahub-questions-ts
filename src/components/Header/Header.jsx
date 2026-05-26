import styles from "./Header.module.css";
function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.headerContainer__logo}>
          <img src="src\images\logo.png" alt="Logo image" />
          <img src="src\images\logo_Yeahub.png" alt="Yeahub logo"/>
        </div>

        <nav className={styles.headerContainer__links}>
          <a href="#">База вопросов</a>
          <a href="#">Тренажер</a>
          <a href="#">Материалы</a>
        </nav>
        <div className={styles.headerContainer__buttons}>
          <button className={styles.loginBtn}>Вход</button>
          <button className={styles.registerBtn}>Регистрация</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
