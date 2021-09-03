import { Message } from "tiny-ui";
import useToggle from "../Utils/useToggle";
import usePomodoro from "../Context/usePomodoro";
import { useMutation, useQuery } from "react-query";
import { getNotes, createNote } from "../../Helpers/api";
import { useEffect } from "react";
import { existsToken } from "../../Helpers/token";

export default function useNote() {
  const { notes, setNotes, addNote, removeNote, editNote, removeAllNotes } =
    usePomodoro();
  const [isVisibleModalNote, toggleModalNote] = useToggle();
  const [isEditMode, toggleEditMode] = useToggle(false);
  const amountNotes = notes.length;
  const availables = amountNotes > 0;
  const getNotesQuery = useQuery("notes", getNotes, { enabled: existsToken() });
  const addNoteMutation = useMutation((payload) => createNote(payload));

  const _addNote = async (note) => {
    const noteData = await addNoteMutation.mutateAsync(note);
    addNote(noteData);
    toggleModalNote();
    Message.success("Se creo la nota");
  };

  const _editNote = (payload) => {
    editNote(payload);
    toggleEditMode();
  };

  useEffect(() => {
    if (getNotesQuery.data && !availables) {
      setNotes(getNotesQuery.data);
    }
  }, [getNotesQuery.data, setNotes]);

  return {
    notes,
    addNote: _addNote,
    removeAllNotes,
    removeNote,
    editNote: _editNote,
    amountNotes,
    availables,
    toggleModalNote,
    toggleEditMode,
    isVisibleModalNote,
    isEditMode,
    // query mutations
    getNotesQuery,
  };
}
