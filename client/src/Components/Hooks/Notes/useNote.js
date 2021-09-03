import { Message } from "tiny-ui";
import useToggle from "../Utils/useToggle";
import usePomodoro from "../Context/usePomodoro";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  deleteAllNotes,
} from "../../Helpers/api";
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
  const removeNoteMutation = useMutation((id) => deleteNote(id));
  const editNoteMutation = useMutation((payload) => updateNote(payload));
  const removeAllNotesMutation = useMutation(deleteAllNotes);

  const _addNote = async (note) => {
    const noteData = await addNoteMutation.mutateAsync(note);
    addNote(noteData);
    toggleModalNote();
    Message.success("Se creo la nota");
  };

  const _editNote = async (payload) => {
    const noteData = await editNoteMutation.mutateAsync(payload);
    editNote(noteData);
    toggleEditMode();
    Message.success("Se editó la nota");
  };

  const _removeNote = async (id) => {
    await removeNoteMutation.mutateAsync(id);
    removeNote(id);
    Message.success("Se eliminó la nota");
  };

  const _removeAllNotes = async () => {
    await removeAllNotesMutation.mutateAsync();
    removeAllNotes();
  };

  useEffect(() => {
    if (getNotesQuery.data && !availables) setNotes(getNotesQuery.data);
  }, [getNotesQuery.data, availables, setNotes]);

  return {
    notes,
    setNotes,
    addNote: _addNote,
    removeAllNotes: _removeAllNotes,
    removeNote: _removeNote,
    editNote: _editNote,
    amountNotes,
    availables,
    toggleModalNote,
    toggleEditMode,
    isVisibleModalNote,
    isEditMode,
    // query mutations
    getNotesQuery,
    addNoteMutation,
    removeNoteMutation,
    editNoteMutation,
    removeAllNotesMutation,
  };
}
