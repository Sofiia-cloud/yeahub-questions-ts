import styles from "./Pagination.module.css";
export function Pagination({ page, total, onChange }) {
  const getPagination = (total) => {
    const pages = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    for (let i = 1; i <= 6; i++) {
      pages.push(i);
    }

    pages.push("...");

    pages.push(total);

    return pages;
  };

  const paginationItems = getPagination(total);
  const last = paginationItems[paginationItems.length - 1];

  return (
    <div className={styles.pagination}>
      <button
        className={styles.arrow_left}
        disabled={page === 1 ? true : false}
        onClick={() => {
          onChange(page - 1);
        }}
      ></button>
      <div className={styles.pagination__numbers}>
        {paginationItems.map((item, index) => {
          return (
            <button
              key={index}
              className={item === page ? styles.active : ""}
              onClick={() => {
                if (item !== "...") {
                  onChange(item);
                }
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
      <button
        className={styles.arrow_right}
        disabled={page === last ? true : false}
        onClick={() => {
          onChange(page + 1);
        }}
      ></button>
    </div>
  );
}
