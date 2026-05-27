import FilterButtons from "../FilterButtons/FilterButtons";
import styles from "./FilterPanel.module.css";
import type {
  Specialization,
  Skill,
  FilterValues,
  FilterActions,
} from "../../types";
interface FilterData {
  specializations: Specialization[];
  skills: Skill[];
}

interface FilterPanelProps {
  values: FilterValues;
  actions: FilterActions;
  data: FilterData;
}

interface ConfigItem {
  id: number;
  title: string | number;
}

function FilterPanel({ values, actions, data }: FilterPanelProps) {
  const {
    keywords,
    selectedSpec,
    selectedSkill,
    selectedLevels,
    selectedRating,
    selectedStatus,
  } = values;
  const {
    setKeywords,
    setSelectedSpec,
    setSelectedSkill,
    setSelectedLevels,
    setSelectedRating,
    setSelectedStatus,
  } = actions;
  const { specializations, skills } = data;

  const levelsConfig: ConfigItem[] = [
    { id: 1, title: "1-3" },
    { id: 4, title: "4-6" },
    { id: 7, title: "7-8" },
    { id: 9, title: "9-10" },
  ];

  const ratingConfig: ConfigItem[] = [
    { id: 1, title: 1 },
    { id: 2, title: 2 },
    { id: 3, title: 3 },
    { id: 4, title: 4 },
    { id: 5, title: 5 },
  ];

  const statusConfig: ConfigItem[] = [
    { id: 1, title: "Изученные" },
    { id: 2, title: "Не изученные" },
    { id: 3, title: "Все" },
  ];

  return (
    <div className={styles.filterPanelContainter}>
      <input
        placeholder="Введите запрос…"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <FilterButtons
        name={"Специализация"}
        title={"slug"}
        buttons={specializations}
        selected={selectedSpec}
        setSelected={setSelectedSpec}
      />
      <FilterButtons
        name={"Навыки"}
        title={"title"}
        valueKey={"id"}
        buttons={skills}
        selected={selectedSkill}
        setSelected={setSelectedSkill}
      />
      <FilterButtons
        name={"Уровень сложности"}
        title={"title"}
        buttons={levelsConfig}
        selected={selectedLevels}
        setSelected={setSelectedLevels}
      />
      <FilterButtons
        name={"Рейтинг"}
        title={"title"}
        buttons={ratingConfig}
        selected={selectedRating}
        setSelected={setSelectedRating}
      />
      <FilterButtons
        name={"Статус"}
        title={"title"}
        buttons={statusConfig}
        selected={selectedStatus}
        setSelected={setSelectedStatus}
      />
    </div>
  );
}

export default FilterPanel;
