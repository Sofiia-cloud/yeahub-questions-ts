import styles from "./LevelTag.module.css";

interface LevelTagProps {
  question: { rate: number; complexity: number };
}

function LevelTag({ question }: LevelTagProps) {
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
