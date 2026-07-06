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
  specialization: number;
  skills: string[];
  complexity: string;
  mode: "repeat" | "new" | "random";
  questionCount: number;
}

export default function QuizSetup() {
  const dispatch = useAppDispatch();
  const complexityLevels = [
    { label: "1-3", value: "1,2,3" },
    { label: "4-6", value: "4,5,6" },
    { label: "7-8", value: "7,8" },
    { label: "9-10", value: "9,10" },
  ];

  const { register, handleSubmit, watch, setValue } = useForm<QuizSetupForm>({
    defaultValues: {
      specialization: 0,
      skills: [],
      complexity: "1,2,3",
      mode: "random",
      questionCount: 10,
    },
  });

  const { data: specializations, isLoading: specsLoading } =
    useGetSpecializationsQuery();
  const { data: skills, isLoading: skillsLoading } = useGetSkillsQuery();

  const [getInterview, { isLoading, error }] = useLazyGetInterviewQuery();

  const onSubmit = async (data: QuizSetupForm) => {
    try {
      const result = await getInterview({
        specialization: data.specialization,
        skills: data.skills.length > 0 ? data.skills.join(",") : undefined,
        complexity: data.complexity,
        limit: data.questionCount,
        mode: data.mode,
      }).unwrap();

      if (result) {
        dispatch(
          startQuiz({
            questions: result.questions,

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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Выбор специализации</p>
          <div className={styles.specializationGrid}>
            {specializations?.map((spec) => (
              <label key={spec.id} className={styles.specializationOption}>
                <input
                  type="radio"
                  value={spec.id}
                  {...register("specialization", { valueAsNumber: true })}
                />
                <span>{spec.title}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Категории вопросов</p>
          <div className={styles.skillsGrid}>
            {skills?.map((skill) => (
              <label key={skill.id} className={styles.skillOption}>
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

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Уровень сложности</p>
          <div className={styles.complexityGroup}>
            {complexityLevels.map((level) => (
              <label key={level.value} className={styles.complexityOption}>
                <input
                  type="radio"
                  value={level.value}
                  {...register("complexity")}
                />
                <span>{level.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Выберите режим</h3>
          <div className={styles.modeGroup}>
            <label className={styles.modeOption}>
              <input type="radio" value="repeat" {...register("mode")} />
              <span>Повторение</span>
            </label>
            <label className={styles.modeOption}>
              <input type="radio" value="new" {...register("mode")} />
              <span>Только новые</span>
            </label>
            <label className={styles.modeOption}>
              <input type="radio" value="random" {...register("mode")} />
              <span>Случайные</span>
            </label>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.countControl}>
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
          {isLoading ? "Загрузка..." : "Начать ->"}
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
