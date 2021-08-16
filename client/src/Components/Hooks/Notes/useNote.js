import { useState } from "react";
import { Message } from "tiny-ui";

export default function useNote() {
  const [notes, setNotes] = useState([
    { title: "importante", color: "red" },
    { title: "urgente", color: "orange" },
  ]);
  const [isVisibleModalNote, setIsVisibleModalNote] = useState(false);
  const amountNotes = notes.length;
  const availables = amountNotes > 0;

  const toggleModalNote = () => {
    setIsVisibleModalNote(!isVisibleModalNote);
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
    toggleModalNote();
    Message.success("Se creo la nota");
  };
  const deleteAllNotes = () => {
    setNotes([]);
  };

  return {
    notes,
    addNote,
    deleteAllNotes,
    amountNotes,
    availables,
    toggleModalNote,
    isVisibleModalNote,
  };
}
