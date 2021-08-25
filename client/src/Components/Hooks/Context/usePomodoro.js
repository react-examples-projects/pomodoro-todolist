import { useContext } from "react";
import PomodoroContext from "../../Context/Pomodoro/PomodoroContext";

export default function usePomodoro() {
  const state = useContext(PomodoroContext);
  if (!state) throw new Error("The pomodoro context is null");
  return state;
}
