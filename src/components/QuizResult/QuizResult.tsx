import { useAppSelector } from "../../store/hooks";
import styles from "./QuizResult.module.css";

function QuizResult() {
  const { questions, answers } = useAppSelector((state) => state.quiz);


  const totalQuestions = questions.length;
  const knownCount = Object.values(answers).filter((a) => a === "KNOWN").length;
  const unknownCount = Object.values(answers).filter(
    (a) => a === "UNKNOWN",
  ).length;

  const progress =
    totalQuestions > 0 ? Math.round((knownCount / totalQuestions) * 100) : 0;

 
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


  const circleCircumference = 2 * Math.PI * 45;
  const strokeDasharray = circleCircumference;
  const strokeDashoffset =
    circleCircumference - (progress / 100) * circleCircumference;

  const getStatusLabel = (status: string | undefined) => {
    if (status === "KNOWN") return { text: "Знаю", className: styles.known };
    if (status === "UNKNOWN")
      return { text: "Не знаю", className: styles.unknown };
    return { text: "Пропущено", className: styles.skipped };
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Умный режим изучения вопросов</h1>

    
      <div className={styles.statsGrid}>
       
        <div className={styles.statsLeft}>
          <h3 className={styles.sectionTitle}>
            Статистика пройденных вопросов
          </h3>

          <div className={styles.progressCircle}>
            <svg className={styles.circleSvg} viewBox="0 0 120 120">
              <circle className={styles.circleBg} cx="60" cy="60" r="45" />
              <circle
                className={styles.circleProgress}
                cx="60"
                cy="60"
                r="45"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 60 60)"
              />
              <text
                className={styles.circleText}
                x="60"
                y="60"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {progress}%
              </text>
            </svg>
            <span className={styles.progressLabel}>Изученно</span>
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

        
        <div className={styles.statsRight}>
          <h3 className={styles.sectionTitle}>Прогресс обучения по навыкам</h3>
          <div className={styles.skillsList}>
            {skillStats.length > 0 ? (
              skillStats.map((skill) => {
                const percentage = Math.round(
                  (skill.known / skill.total) * 100,
                );
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
              })
            ) : (
              <p className={styles.noSkills}>Нет данных по навыкам</p>
            )}
          </div>
        </div>
      </div>

      
      <div className={styles.questionsSection}>
        <h3 className={styles.sectionTitle}>
          Список пройденных вопросов собеседования
        </h3>
        <div className={styles.questionsGrid}>
          {questions.map((q) => {
            const status = answers[q.id];
            const statusInfo = getStatusLabel(status);
            return (
              <div key={q.id} className={styles.questionCard}>
                <span className={styles.questionText}>{q.title}</span>
                <span
                  className={`${styles.statusBadge} ${statusInfo.className}`}
                >
                  {statusInfo.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
