import React, { useReducer, useState } from "react";
import "./styles.scss";

// COMPONENTS
import CanvasForm from "../CanvasForm";
import StickyNote from "../StickyNote";

// REDUCERS
import notesReducer from "../../reducers/notesReducer";

const initialNoteState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

const Canvas = () => {
  const [notesState, dispatch] = useReducer(notesReducer, initialNoteState);
  const [selectedNote, setSelectedNote] = useState();

  const addNote = (note) => {
    dispatch({ type: "ADD_NOTE", payload: note });
  };
  const deleteNote = (note) => {
    dispatch({ type: "DELETE_NOTE", payload: note });
  };
  const updateNote = (note) => {
    dispatch({ type: "UPDATE_NOTE", payload: note });
  }

  const selectNote = (note) => {
    setSelectedNote(note);
    console.log(`selected note with id: ${note.id}`);
  }

  const dropNote = (event) => {
    event.target.style.top = `${event.pageY - 50}px`;
    event.target.style.left = `${event.pageX - 50}px`;
  };

  const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className="canvas" onDragOver={dragOver} onClick={() => setSelectedNote()}>
      <CanvasForm addNote={addNote} />
      {notesState.notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          dropNote={dropNote}
          deleteNote={deleteNote}
          selectNote={selectNote}
          updateNote={updateNote}
          isSelected={note?.id === selectedNote?.id}
        />
      ))}
    </div>
  );
};

export default Canvas;
