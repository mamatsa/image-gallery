import { useEffect, useState } from "react";

const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  // Get search history from localstorage
  useEffect(() => {
    try {
      const searchHistory = localStorage.getItem("searchHistory") ?? "[]";
      setHistory(JSON.parse(searchHistory));
    } catch (e) {
      console.error("Error retrieving search history:", e);
    }
  }, []);

  // Save search history array in localstorage
  function saveInHistory(searchValue: string): void {
    try {
      let history: string[] = JSON.parse(
        localStorage.getItem("searchHistory") || "[]",
      );
      const filteredHistory = history.filter((item) => item !== searchValue); // Avoid duplicates
      filteredHistory.unshift(searchValue);
      localStorage.setItem("searchHistory", JSON.stringify(filteredHistory));
    } catch (e) {
      console.error("Error saving search history:", e);
    }
  }

  function deleteFromHistory(term: string) {
    const newHistory = history.filter((item) => item !== term);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  }

  return { history, saveInHistory, deleteFromHistory };
};

export default useSearchHistory;
