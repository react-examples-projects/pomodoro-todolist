import { useState } from "react";

export default function useNote() {
  const [notes, setNotes] = useState([]);
  const [isVisibleModalNote, setIsVisibleModalNote] = useState(false);
  const amountNotes = notes.length;
  const availables = amountNotes > 0;

  const toggleModalNote = () => {
    setIsVisibleModalNote(!isVisibleModalNote);
  };

  const addNote = (note) => {
    setNotes([...notes, note]);
    toggleModalNote();
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
