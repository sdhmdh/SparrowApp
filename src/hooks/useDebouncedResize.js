import { useEffect } from "react";
import { debounce } from "../utils";

export const useDebouncedResize = (callback, delay = 200) => {
  useEffect(() => {
    const debouncedCallback = debounce(callback, delay);
    window.addEventListener("resize", debouncedCallback);
    callback();
    return () => {
      window.removeEventListener("resize", debouncedCallback);
    };
  }, [callback, delay]);
};
