import { START_A_TASK, STOP_A_TASK, PAUSE_A_TASK } from "./Types/Types";

export const startTaskAction = (payload) => {
  return {
    type: START_A_TASK,
    payload,
  };
};

export const stopTaskAction = () => {
  return {
    type: STOP_A_TASK,
  };
};

export const pauseTaskAction = () => {
  return {
    type: PAUSE_A_TASK,
  };
};
