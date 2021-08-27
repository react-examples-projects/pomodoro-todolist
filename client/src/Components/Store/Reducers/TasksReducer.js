import {
  SET_TASKS,
  ADD_TASK,
  REMOVE_TASK,
  EDIT_TASK,
  REMOVE_ALL_TASKS,
} from "../Actions/Types/Types";

export default function TasksReducer(state, { type, payload }) {
  switch (type) {
    case SET_TASKS:
      return [...payload];

    case ADD_TASK:
      return [...state, payload];

    case REMOVE_TASK: {
      const newtasks = state.filter((task) => task.id !== payload);
      return newtasks;
    }

    case EDIT_TASK: {
      const newtasks = state.map((task) => {
        if (payload.id === task.id) {
          task = { ...task, ...payload };
        }
        return task;
      });

      return newtasks;
    }

    case REMOVE_ALL_TASKS:
      return [];

    default:
      return state;
  }
}
