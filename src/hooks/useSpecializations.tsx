import { useEffect, useState } from "react";

function useSpecializations() {
  const [specializations, setSpecializations] = useState([]);
  useEffect(() => {
    fetch("https://api.yeatwork.ru/specializations")
      .then((response) => response.json())
      .then((data) => setSpecializations(data?.data))
      .catch((error) => console.error("Error: ", error));
  }, []);
  return specializations;
}

export default useSpecializations;
