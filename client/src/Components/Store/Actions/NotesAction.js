import { ADD_NOTE, EDIT_NOTE, REMOVE_NOTE, SET_NOTES } from "./Types/Types";

export const addNoteAction = (payload) => {
  return {
    type: ADD_NOTE,
    payload,
  };
};

export const editNoteAction = (payload) => {
  return {
    type: EDIT_NOTE,
    payload,
  };
};

export const removeNoteAction = (payload) => {
  return {
    type: REMOVE_NOTE,
    payload,
  };
};

export const setNotesAction = (payload) => {
  return {
    type: SET_NOTES,
    payload,
  };
};
