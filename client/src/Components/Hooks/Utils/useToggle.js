import { useCallback, useState } from "react";

export default function useToggle(boolean) {
  const [state, setState] = useState(!!boolean);
  const toggleState = useCallback(() => {
    setState((state) => !state);
  }, []);
  
  return [state, toggleState];
}
