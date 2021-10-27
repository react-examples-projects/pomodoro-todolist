import { START_A_TASK, STOP_A_TASK } from "./Types/Types";

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
