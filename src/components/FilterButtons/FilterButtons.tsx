import { useState } from "react";
import styles from "./FilterButtons.module.css";

interface FilterItemBase {
  id: number | string;
  title: string | number;
  slug?: string;
  description?: string;
  imageSrc?: string | null;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string | null;
  specializations?: unknown[];
}

interface FilterButtonsProps<T extends FilterItemBase> {
  name: string;
  title: keyof T;
  valueKey?: keyof T;
  buttons: T[];
  selected: string;
  setSelected: (value: string) => void;
}

function FilterButtons<T extends FilterItemBase>({
  name,
  title,
  valueKey = title,
  buttons,
  selected,
  setSelected,
}: FilterButtonsProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const allFilters: T[] = buttons || [];
  const showFilters = isOpen ? allFilters : allFilters.slice(0, 6);

  const getStringValue = (obj: T, key: keyof T): string => {
    const value = obj[key];
    if (value === undefined || value === null) return "";
    return String(value);
  };

  return (
    <div className={styles.specializationContainer}>
      <p className={styles.specializationContainer__header}>{name}</p>
      <ul>
        {showFilters.map((filter) => {
          const filterValue = getStringValue(filter, valueKey);
          const isChosen = filterValue === selected;
          return (
            <li key={getStringValue(filter, "id")}>
              <button
                className={isChosen ? "btn_active" : "btn_usual"}
                onClick={() => setSelected(filterValue)}
              >
                {getStringValue(filter, title)}
              </button>
            </li>
          );
        })}
      </ul>
      {allFilters.length > 6 && (
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
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
