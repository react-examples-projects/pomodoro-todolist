import { Message } from "tiny-ui";
import useToggle from "../Utils/useToggle";
import uniqid from "uniqid";
import usePomodoro from "../Context/usePomodoro";

export default function useNote() {
  const { notes, addNote, removeNote, editNote, removeAllNotes } =
    usePomodoro();

  const [isVisibleModalNote, toggleModalNote] = useToggle();
  const [isEditMode, toggleEditMote] = useToggle(false);
  const amountNotes = notes.length;
  const availables = amountNotes > 0;

  const _addNote = (note) => {
    note.id = uniqid();
    addNote(note);
    toggleModalNote();
    Message.success("Se creo la nota");
  };

  const _editNote = (payload) => {
    editNote(payload);
    toggleEditMote();
  };

  return {
    notes,
    addNote: _addNote,
    removeAllNotes,
    removeNote,
    editNote: _editNote,
    amountNotes,
    availables,
    toggleModalNote,
    toggleEditMote,
    isVisibleModalNote,
    isEditMode,
  };
}
