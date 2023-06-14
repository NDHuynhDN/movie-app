import React, { useEffect, useState } from "react";
// sau 1 khoang thoi gian ms fetch du lieu
export default function useDebounce(initializeValue = "", delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(initializeValue);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initializeValue);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, initializeValue]);
  return debounceValue;
}
