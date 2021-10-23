import { useReducer, useCallback, useMemo } from "react";
import PomodoroContext from "./PomodoroContext";
import { combineReducers } from "../../Helpers/utils";
import initialState from "../../Store/initialState";

// reducers
import notes from "../../Store/Reducers/NotesReducer";
import tasks from "../../Store/Reducers/TasksReducer";
import currentTask from "../../Store/Reducers/StartTaskReducer";

import {
  setNotesAction,
  addNoteAction,
  editNoteAction,
  removeNoteAction,
  removeAllNotesAction,
} from "../../Store/Actions/NotesAction";

import {
  setTasksAction,
  addTaskAction,
  editTaskAction,
  removeTaskAction,
  removeAllTasksAction,
} from "../../Store/Actions/TasksAction";

import {
  startTaskAction,
  stopTaskAction,
  pauseTaskAction,
} from "../../Store/Actions/StartTaskAction";

export default function PomodoroProvider({ children }) {
  const [state, dispatch] = useReducer(
    combineReducers({ notes, tasks, currentTask }),
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

  const setTasks = useCallback((payload) => {
    dispatch(setTasksAction(payload));
  }, []);

  const addTask = useCallback((payload) => {
    dispatch(addTaskAction(payload));
  }, []);

  const editTask = useCallback((payload) => {
    dispatch(editTaskAction(payload));
  }, []);

  const removeTask = useCallback((payload) => {
    dispatch(removeTaskAction(payload));
  }, []);

  const removeAllTasks = useCallback(() => {
    dispatch(removeAllTasksAction());
  }, []);

  const startTask = useCallback((payload) => {
    dispatch(startTaskAction(payload));
  }, []);

  const stopTask = useCallback(() => {
    dispatch(stopTaskAction());
  }, []);

  const pauseTask = useCallback(() => {
    dispatch(pauseTaskAction());
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setNotes,
      addNote,
      editNote,
      removeNote,
      removeAllNotes,

      setTasks,
      addTask,
      editTask,
      removeTask,
      removeAllTasks,

      startTask,
      stopTask,
      pauseTask,
    }),
    [
      state,
      setNotes,
      addNote,
      editNote,
      removeNote,
      removeAllNotes,
      setTasks,
      addTask,
      editTask,
      removeTask,
      removeAllTasks,
      startTask,
      stopTask,
      pauseTask,
    ]
  );

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
}
