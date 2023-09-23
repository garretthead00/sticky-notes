import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.scss";

const CanvasForm = (props) => {
  const [noteInput, setNoteInput] = useState("");

  const addNote = (event) => {
    event.preventDefault();

    if (!noteInput) {
      return;
    }
    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() * 20),
    };
    setNoteInput("");
    props.addNote(newNote);
  };

  return (
    <form className="note-form" onSubmit={addNote}>
      <textarea
        placeholder="Create a new note..."
        value={noteInput}
        onChange={(event) => setNoteInput(event.target.value)}
      ></textarea>
      <button>Add</button>
    </form>
  );
};

export default CanvasForm;
