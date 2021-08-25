import { SET_NOTES } from "../Actions/Types/Types";

export default function NotesReducer(state, { type, payload }) {
  switch (type) {
    case SET_NOTES:
      return [...payload];

    default:
      return state;
  }
}
