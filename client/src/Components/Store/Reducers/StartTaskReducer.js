import {
  START_A_TASK,
  STOP_A_TASK,
  PAUSE_A_TASK,
} from "../Actions/Types/Types";

export default function StartTaskReducer(state, { type, payload }) {
  switch (type) {
    case START_A_TASK:
      return {
        ...state,
        ...payload,
        paused: false,
      };

    case STOP_A_TASK:
      return null;

    case PAUSE_A_TASK:
      return {
        ...state,
        ...payload,
        paused: true,
      };

    default:
      return state;
  }
}
