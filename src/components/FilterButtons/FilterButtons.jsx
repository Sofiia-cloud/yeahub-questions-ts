import { useState } from "react";
import styles from "./FilterButtons.module.css";
function FilterButtons({
  name,
  title,
  valueKey = title,
  buttons,
  selected,
  setSelected,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const allFilters = buttons || [];
  const showFilters = isOpen ? allFilters : allFilters.slice(0, 6);
  return (
    <div className={styles.specializationContainer}>
      <p className={styles.specializationContainer__header}>{name}</p>
      <ul>
        {showFilters.map((filter) => {
          const isChosen = filter[title] === selected;
          return (
            <li key={filter.id}>
              <button
                className={isChosen ? "btn_active" : "btn_usual"}
                onClick={() => setSelected(filter[valueKey])}
              >
                {filter.title}
              </button>
            </li>
          );
        })}
      </ul>
      {allFilters.length > 6 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? "Скрыть" : "Посмотреть все"}
        </button>
      )}
    </div>
  );
}

export default FilterButtons;
