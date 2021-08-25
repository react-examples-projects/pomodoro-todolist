import { useReducer, useCallback, useMemo } from "react";
import PomodoroContext from "./PomodoroContext";
import { combineReducers } from "../../Helpers/utils";
import initialState from "../../Store/initialState";
// reducers
import pendings from "../../Store/Reducers/PendingsReducer";
import importants from "../../Store/Reducers/ImportantsReducer";
import completed from "../../Store/Reducers/CompletedReducer";
import notes from "../../Store/Reducers/NotesReducer";
import {
  setNotesAction,
  addNoteAction,
  editNoteAction,
  removeNoteAction,
  removeAllNotesAction,
} from "../../Store/Actions/NotesAction";

export default function PomodoroProvider({ children }) {
  const [state, dispatch] = useReducer(
    combineReducers({ pendings, importants, completed, notes }),
    initialState
  );

  const setNotes = useCallback((payload) => {
    dispatch(setNotesAction(payload));
  }, []);

  const addNote = useCallback((payload) => {
    dispatch(addNoteAction(payload));
  }, []);

  const editNote = useCallback((payload) => {
    dispatch(editNoteAction(payload));
  }, []);

  const removeNote = useCallback((payload) => {
    dispatch(removeNoteAction(payload));
  }, []);

  const removeAllNotes = useCallback(() => {
    dispatch(removeAllNotesAction());
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setNotes,
      addNote,
      editNote,
      removeNote,
      removeAllNotes,
    }),
    [state, setNotes, addNote, editNote, removeNote, removeAllNotes]
  );

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}
