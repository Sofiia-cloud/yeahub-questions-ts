import { useState } from "react";
import styles from "./ExpandableText.module.css";

interface ExpandableTextProps {
  content: string;
}

function ExpandableText({ content }: ExpandableTextProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getShortLongAnswer = () => {
    if (content.length <= 100) return content;

    return content.slice(0, 100) + "...";
  };

  return (
    <>
      {isOpen ? (
        <>
          <div
            className={styles.answer}
            dangerouslySetInnerHTML={{
              __html: content || "Нет развёрнутого ответа",
            }}
          />
          <button
            className={styles.expandButton}
            onClick={() => setIsOpen(false)}
          >
            Свернуть ↑
          </button>
        </>
      ) : (
        <>
          <div
            className={styles.answer}
            dangerouslySetInnerHTML={{ __html: getShortLongAnswer() }}
          />
          {content.length > 100 && (
            <button
              className={styles.expandButton}
              onClick={() => setIsOpen(true)}
            >
              Развернуть ↓
            </button>
          )}
        </>
      )}
    </>
  );
}

export default ExpandableText;
