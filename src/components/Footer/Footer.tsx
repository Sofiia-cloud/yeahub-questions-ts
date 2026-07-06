import styles from "./Footer.module.css";
import figma from "../../images/Figma.png";
import telegram from "../../images/Telegram_white.png";
import youtube from "../../images/YouTube_white.png";
import tiktok from "../../images/TikTok.png";
import github from "../../images/Github_white.png";
function Footer() {
  return (
    <footer>
      <p className={styles.logo}>Yeahub</p>
      <p className={styles.tagline}>
        Выбери, каким будет IT завтра, вместе с нами
      </p>
      <p className={styles.description}>
        YeaHub — это полностью открытый проект, призванный объединить и улучшить
        IT-сферу. Наш исходный код доступен для просмотра на GitHub. Дизайн
        проекта также открыт для ознакомления в Figma.
      </p>
      <hr className={styles.divider} />
      <div className={styles.bottom}>
        <div className={styles.bottom_left}>
          <p className={styles.copy}>© 2024 YeaHub</p>
          <a href="#" className={styles.docLink}>
            Документы
          </a>
        </div>
        <div className={styles.bottom_right}>
          <p className={styles.socialLabel}>
            Ищите нас и в других соцсетях @yeahub_it
          </p>
          <div className={styles.icons}>
            <a href="#">
              <img src={figma} alt="Figma" />
            </a>
            <a href="#">
              <img src={telegram} alt="Telegram" />
            </a>
            <a href="#">
              <img src={youtube} alt="YouTube" />
            </a>
            <a href="#">
              <img src={tiktok} alt="TikTok" />
            </a>
            <a href="#">
              <img src={github} alt="Github" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
