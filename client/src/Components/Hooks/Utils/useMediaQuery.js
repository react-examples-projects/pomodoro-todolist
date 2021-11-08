import { useEffect, useState } from "react";

export default function useMediaQuery(query) {
  const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    function checkMedia() {
      const match = window.matchMedia(`(${query})`);
      setMobile(match.matches);
    }
    
    checkMedia();
    window.addEventListener("resize", checkMedia);
    
    return () => {
      window.removeEventListener("resize", checkMedia);
    };
  }, [query]);
  return isMobile;
}