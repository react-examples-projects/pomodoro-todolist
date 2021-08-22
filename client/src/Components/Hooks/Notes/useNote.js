import { useState } from "react";
import { Message } from "tiny-ui";
import useToggle from "../Utils/useToggle";

export default function useNote() {
  const [notes, setNotes] = useState([
    { title: "importante", color: "red", content: "probando contenido", id: 1 },
    { title: "urgente", color: "orange", content: "otro contenido", id: 2 },
  ]);
  const [isVisibleModalNote, toggleModalNote] = useToggle();
  const [isEditMode, toggleEditMote] = useToggle(false);
  const amountNotes = notes.length;
  const availables = amountNotes > 0;

  const addNote = (note) => {
    setNotes([...notes, note]);
    toggleModalNote();
    Message.success("Se creo la nota");
  };

  const removeNote = (id) => {
    const notesFilter = notes.filter((note) => note.id !== id);
    setNotes(notesFilter);
  };

  const editNote = ({ id, payload }) => {
    const newNotes = notes.map((note) => {
      if (id === note.id) {
        return { ...note, ...payload };
      }
      return note;
    });

    setNotes(newNotes);
    toggleEditMote();
  };

  const removeNotes = () => {
    setNotes([]);
  };

  return {
    notes,
    addNote,
    removeNotes,
    removeNote,
    editNote,
    amountNotes,
    availables,
    toggleModalNote,
    toggleEditMote,
    isVisibleModalNote,
    isEditMode
  };
}
