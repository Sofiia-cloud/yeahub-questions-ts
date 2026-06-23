import { useAppSelector } from "../../store/hooks";

import styles from "./QuizResult.module.css";

function QuizResult() {
  const { questions, answers } = useAppSelector((state) => state.quiz);

  // Подсчет статистики
  const totalQuestions = questions.length;
  // const answeredCount = Object.keys(answers).length;
  const knownCount = Object.values(answers).filter((a) => a === "KNOWN").length;
  const unknownCount = totalQuestions - knownCount;
  // const skippedCount = totalQuestions - answeredCount;
  const progress =
    totalQuestions > 0 ? Math.round((knownCount / totalQuestions) * 100) : 0;

  // Группировка по навыкам
  const skillStats = questions.reduce(
    (acc, q) => {
      q.questionSkills.forEach((skill) => {
        const existing = acc.find((s) => s.id === skill.id);
        if (existing) {
          existing.total += 1;
          if (answers[q.id] === "KNOWN") {
            existing.known += 1;
          }
        } else {
          acc.push({
            id: skill.id,
            title: skill.title,
            total: 1,
            known: answers[q.id] === "KNOWN" ? 1 : 0,
          });
        }
      });
      return acc;
    },
    [] as Array<{ id: number; title: string; total: number; known: number }>,
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Умный режим изучения вопросов</h1>

      {/* Статистика */}
      <div className={styles.statsSection}>
        <h3 className={styles.sectionTitle}>Статистика пройденных вопросов</h3>
        <div className={styles.statsGrid}>
          <div className={styles.progressCircle}>
            <div className={styles.circle}>
              <span className={styles.progressPercent}>{progress}%</span>
              <span className={styles.progressLabel}>Изученно</span>
            </div>
          </div>

          <div className={styles.statsCards}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{totalQuestions}</span>
              <span className={styles.statLabel}>Всего</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>
                {questions.filter((q) => q.status === "draft").length}
              </span>
              <span className={styles.statLabel}>Новые</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{unknownCount}</span>
              <span className={styles.statLabel}>В процессе</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{knownCount}</span>
              <span className={styles.statLabel}>Изучено</span>
            </div>
          </div>
        </div>
      </div>

      {/* Прогресс по навыкам */}
      {skillStats.length > 0 && (
        <div className={styles.skillsSection}>
          <h3 className={styles.sectionTitle}>Прогресс обучения по навыкам</h3>
          <div className={styles.skillsList}>
            {skillStats.map((skill) => {
              const percentage = Math.round((skill.known / skill.total) * 100);
              return (
                <div key={skill.id} className={styles.skillRow}>
                  <span className={styles.skillName}>{skill.title}</span>
                  <div className={styles.skillProgress}>
                    <div
                      className={styles.skillProgressFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={styles.skillCount}>
                    {skill.known}/{skill.total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Список вопросов */}
      <div className={styles.questionsSection}>
        <h3 className={styles.sectionTitle}>
          Список пройденных вопросов собеседования
        </h3>
        <ul className={styles.questionsList}>
          {questions.map((q) => {
            const status = answers[q.id];
            return (
              <li key={q.id} className={styles.questionItem}>
                <span className={styles.questionText}>{q.title}</span>
                <span
                  className={status === "KNOWN" ? styles.known : styles.unknown}
                >
                  {status === "KNOWN"
                    ? "Знаю"
                    : status === "UNKNOWN"
                      ? "Не знаю"
                      : "Пропущено"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default QuizResult;
