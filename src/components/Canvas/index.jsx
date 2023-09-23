import React, { useReducer } from "react";
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

  const addNote = (note) => {
    dispatch({ type: "ADD_NOTE", payload: note });
  };
  const deleteNote = (note) => {
    dispatch({ type: "DELETE_NOTE", payload: note });
  };

  const dropNote = (event) => {
    event.target.style.top = `${event.pageY - 50}px`;
    event.target.style.left = `${event.pageX - 50}px`;
  };

  const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className="canvas" onDragOver={dragOver}>
      <CanvasForm addNote={addNote} />
      {notesState.notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          dropNote={dropNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
};

export default Canvas;
