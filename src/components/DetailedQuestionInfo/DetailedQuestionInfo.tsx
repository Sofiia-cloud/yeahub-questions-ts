import LevelTag from "../LevelTag/LevelTag";
import styles from "./DetailedQuestionInfo.module.css";
interface Skill {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
}

interface Question {
  id: number;
  title: string;
  imageSrc: string | null;
  shortAnswer: string;
  rate: number;
  complexity: number;
  questionSkills: Skill[];
  keywords?: string[]; 
  createdBy?: User | null; 
}

interface DetailedQuestionInfoProps {
  question: Question;
}

function DetailedQuestionInfo({ question }: DetailedQuestionInfoProps) {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoCard}>
        <div className={styles.levelRow}>
          <span className={styles.infoLabel}>Уровень:</span>
          <LevelTag question={question} />
        </div>

        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Навыки:</span>
          <div className={styles.tagGroup}>
            {question.questionSkills?.map((skill, idx) => (
              <span key={idx} className={styles.skill}>
                {skill.title}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Ключевые слова:</span>
          <div className={styles.tagGroup}>
            {question.keywords?.map((keyword, idx) => (
              <span key={idx} className={styles.keyword}>
                #{keyword}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Автор:</span>
          <span className={styles.author}>
            {question.createdBy?.username || "Не указан"}
          </span>
        </div>
      </div>

      <div className={styles.expertCard}>
        <h4>Руслан Куянец</h4>
        <p>Python Guru</p>
        <p>Guru — это эксперты YeaHub, которые помогают развивать комьюнити.</p>
      </div>
    </div>
  );
}

export default DetailedQuestionInfo;
