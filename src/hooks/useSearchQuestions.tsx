import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { QuestionsResponse, Filters } from "../types";

interface NewFilters {
  keywords?: string;
  pageNumber?: number;
  page?: number;
  selectedSpec?: string;
  selectedSkill?: string;
  selectedLevels?: string;
  selectedRating?: string;
  selectedStatus?: string;
  [key: string]: string | number | undefined;
}

interface UseSearchQuestionsReturn {
  filters: Filters;
  questions: QuestionsResponse | null;
  updateFilters: (newFilters: NewFilters) => void;
  loading: boolean;
}

function useSearchQuestions(): UseSearchQuestionsReturn {
  const [searchParams, setSearchParams] = useSearchParams();
  const [questions, setQuestions] = useState<QuestionsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const updateFilters = (newFilters: NewFilters): void => {
    const updatedParams = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      let paramKey: string = key;
      if (key === "pageNumber") paramKey = "page";
      if (key === "selectedSpec") paramKey = "specializationSlug";
      if (key === "selectedSkill") paramKey = "skills";
      if (key === "selectedLevels") paramKey = "complexity";
      if (key === "selectedRating") paramKey = "rate";
      if (key === "selectedStatus") paramKey = "status";

      if (value && value !== "" && value !== null && value !== "all") {
        updatedParams.set(paramKey, String(value));
      } else {
        updatedParams.delete(paramKey);
      }
    });

    if (
      newFilters.page === undefined &&
      newFilters.pageNumber === undefined &&
      Object.keys(newFilters).length > 0
    ) {
      updatedParams.set("page", "1");
    }

    setSearchParams(updatedParams);
  };

  useEffect(() => {
    const fetchQuestions = async (): Promise<void> => {
      setLoading(true);

      const page = searchParams.get("page") || "1";
      const keywords = searchParams.get("keywords") || "";
      const specializationSlug = searchParams.get("specializationSlug") || "";
      const skills = searchParams.get("skills") || "";
      const complexity = searchParams.get("complexity") || "";
      const rate = searchParams.get("rate") || "";
      const status = searchParams.get("status") || "";

      let url = `https://api.yeatwork.ru/questions/public-questions?page=${page}&limit=10`;

      if (keywords?.trim()) {
        url += `&keywords=${encodeURIComponent(keywords.trim())}`;
      }
      if (specializationSlug) {
        url += `&specializationSlug=${specializationSlug}`;
      }
      if (skills) {
        url += `&skills=${skills}`;
      }
      if (complexity) {
        url += `&complexity[]=${complexity}`;
      }
      if (rate) {
        url += `&rate[]=${rate}`;
      }
      if (status) {
        url += `&status[]=${status}`;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Ошибка загрузки");
        const data: QuestionsResponse = await response.json();

        setQuestions(data);
      } catch (error) {
        console.error("Ошибка:", error);
        setQuestions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [searchParams]);

  const filters: Filters = {
    keywords: searchParams.get("keywords") || "",
    pageNumber: parseInt(searchParams.get("page") || "1"),
    selectedSpec: searchParams.get("specializationSlug") || "",
    selectedSkill: searchParams.get("skills") || "",
    selectedLevels: searchParams.get("complexity") || "",
    selectedRating: searchParams.get("rate") || "",
    selectedStatus: searchParams.get("status") || "",
  };

  return { filters, questions, updateFilters, loading };
}

export default useSearchQuestions;
