import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/hooks";
import {
  useGetSkillsQuery,
  useGetSpecializationsQuery,
} from "../../services/api/filtersApi";
import { useLazyGetInterviewQuery } from "../../services/api/interviewApi";
import { startQuiz } from "../../store/slices/quizSlice";
import styles from "./QuizSetups.module.css"; 

interface QuizSetupForm {
  specializationSlug: string;
  skills: string[];
  complexity: string;
  mode: "repeat" | "new" | "random";
  questionCount: number;
}

export default function QuizSetup() {
  const dispatch = useAppDispatch();
  const complexityLevels = ["1-3", "4-6", "7-8", "9-10"];

  const { register, handleSubmit, watch, setValue } = useForm<QuizSetupForm>({
    defaultValues: {
      specializationSlug: "",
      skills: [],
      complexity: "1-3",
      mode: "random",
      questionCount: 10,
    },
  });

  const { data: specializations, isLoading: specsLoading } =
    useGetSpecializationsQuery();
  const { data: skills, isLoading: skillsLoading } = useGetSkillsQuery();

  // ✅ Исправлено: isLoading: error → isLoading, error
  const [getInterview, { isLoading, error }] = useLazyGetInterviewQuery();

  const onSubmit = async (data: QuizSetupForm) => {
    try {
      const result = await getInterview({
        specializationSlug: data.specializationSlug || undefined,
        skills: data.skills.length > 0 ? data.skills.join(",") : undefined,
        questionCount: data.questionCount,
      }).unwrap();

      if (result) {
        dispatch(
          startQuiz({
            questions: result.questions,
            totalQuestions: result.fullCount,
            startedAt: result.startDate,
            answers: result.response.answers.map((a) => ({
              questionId: a.questionId,
              answer: a.answer,
            })),
            mode: data.mode,
          }),
        );
      }
    } catch (err) {
      console.error("Failed to start interview", err);
    }
  };

  if (specsLoading || skillsLoading) {
    return <div className={styles.loading}>Загрузка данных...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Собеседование</h1>

      {/* ✅ Форма теперь содержит все элементы */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Выбор специализации */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Выбор специализации</p>
          <div className={styles.specializationGrid}>
            {specializations?.map((spec) => (
              <label key={spec.id} className={styles.option}>
                <input
                  type="radio"
                  value={spec.slug}
                  {...register("specializationSlug")}
                />
                <span>{spec.title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Категории вопросов (навыки) */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Категории вопросов</p>
          <div className={styles.skillsGrid}>
            {skills?.map((skill) => (
              <label key={skill.id} className={styles.option}>
                <input
                  type="checkbox"
                  value={skill.id.toString()}
                  {...register("skills")}
                />
                <span>{skill.title}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Уровень сложности */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Уровень сложности</p>
          <div className={styles.optionsGroup}>
            {complexityLevels.map((level) => (
              <label key={level} className={styles.option}>
                <input type="radio" value={level} {...register("complexity")} />
                <span>{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Выбор режима */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Выберите режим</h3>
          <div className={styles.optionsGroup}>
            <label className={styles.option}>
              <input type="radio" value="repeat" {...register("mode")} />
              <span>Повторение</span>
            </label>
            <label className={styles.option}>
              <input type="radio" value="new" {...register("mode")} />
              <span>Только новые</span>
            </label>
            <label className={styles.option}>
              <input type="radio" value="random" {...register("mode")} />
              <span>Случайные</span>
            </label>
          </div>
        </div>

        {/* Количество вопросов */}
        <div className={styles.section}>
          <div className={styles.countControl}>
            <label htmlFor="questionCount">Количество вопросов</label>
            <div className={styles.countInput}>
              <button
                type="button"
                className={styles.countButton}
                onClick={() => {
                  const current = watch("questionCount");
                  if (current > 5) {
                    setValue("questionCount", current - 1);
                  }
                }}
              >
                −
              </button>
              <input
                id="questionCount"
                type="number"
                className={styles.countInputField}
                {...register("questionCount")}
                min={5}
                max={35}
              />
              <button
                type="button"
                className={styles.countButton}
                onClick={() => {
                  const current = watch("questionCount");
                  if (current < 35) {
                    setValue("questionCount", current + 1);
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={styles.startButton}
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : "Начать собеседование"}
        </button>

        {error && (
          <div className={styles.error}>
            Ошибка загрузки вопросов. Попробуйте снова.
          </div>
        )}
      </form>
    </div>
  );
}
