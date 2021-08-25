import {
  SET_NOTES,
  ADD_NOTE,
  REMOVE_NOTE,
  EDIT_NOTE,
  REMOVE_ALL_NOTES,
} from "../Actions/Types/Types";

export default function NotesReducer(state, { type, payload }) {
  switch (type) {
    case SET_NOTES:
      return [...payload];

    case ADD_NOTE:
      return [...state, payload];

    case REMOVE_NOTE: {
      const newNotes = state.filter((note) => note.id !== payload);
      return newNotes;
    }

    case EDIT_NOTE: {
      const newNotes = state.map((note) => {
        if (payload.id === note.id) {
          note = { ...note, ...payload };
        }
        return note;
      });

      return newNotes;
    }

    case REMOVE_ALL_NOTES:
      return [];

    default:
      return state;
  }
}
