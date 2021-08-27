import {
  ADD_TASK,
  EDIT_TASK,
  REMOVE_TASK,
  SET_TASKS,
  REMOVE_ALL_TASKS,
} from "./Types/Types";

export const addTaskAction = (payload) => {
  return {
    type: ADD_TASK,
    payload,
  };
};

export const editTaskAction = (payload) => {
  return {
    type: EDIT_TASK,
    payload,
  };
};

export const removeTaskAction = (payload) => {
  return {
    type: REMOVE_TASK,
    payload,
  };
};

export const removeAllTasksAction = () => {
  return {
    type: REMOVE_ALL_TASKS,
  };
};

export const setTasksAction = (payload) => {
  return {
    type: SET_TASKS,
    payload,
  };
};
