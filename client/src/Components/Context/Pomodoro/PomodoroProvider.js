import { useReducer, useCallback, useMemo } from "react";
import PomodoroContext from "./PomodoroContext";
import { combineReducers } from "../../Helpers/utils";
import initialState from "../../Store/initialState";
// reducers
import pendings from "../../Store/Reducers/PendingsReducer";
import importants from "../../Store/Reducers/ImportantsReducer";
import completed from "../../Store/Reducers/CompletedReducer";
import notes from "../../Store/Reducers/NotesReducer";
import { setNotesAction } from "../../Store/Actions/NotesAction";

export default function PomodoroProvider({ children }) {
  const [state, dispatch] = useReducer(
    combineReducers({ pendings, importants, completed, notes }),
    initialState
  );

  const setNotes = useCallback((payload) => {
    dispatch(setNotesAction(payload));
  }, []);

  const value = useMemo(() => ({ ...state, setNotes }), [state, setNotes]);

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}
