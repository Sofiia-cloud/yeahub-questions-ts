import styles from "./LevelTag.module.css";
function LevelTag({ question }) {
  return (
    <div>
      <span className={styles.tag_name}>
        Рейтинг: <span className={styles.tag}>{question.rate}</span>
      </span>
      <span className={styles.tag_name}>
        Сложность: <span className={styles.tag}>{question.complexity}</span>
      </span>
    </div>
  );
}

export default LevelTag;
