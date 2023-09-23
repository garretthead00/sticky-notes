import React, { useReducer } from "react";

import "./styles.scss";

// COMPONENTS
import CanvasForm from "../CanvasForm";
import StickyNote from "../StickyNote";

const initialNoteState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

// The purpose of a reducer is to take an action and the current state
// then update the state and return the updated state.
const notesReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        totalNotes: prevState.notes.length + 1,
        notes: [...prevState.notes, action.payload],
      };
      console.log("ADD_NOTE", newState);
      return newState;
    }
    case "DELETE_NOTE": {
      const newState = {
        ...prevState,
        totalNotes: prevState.notes.length - 1,
        notes: prevState.notes.filter((note) => note.id !== action.payload.id),
      };
      console.log("DELETE_NOTE", newState);
      return newState;
    }
    default: {
    }
  }
};

const Canvas = () => {
  
  const [notesState, dispatch] = useReducer(notesReducer, initialNoteState);

  const addNote = (note) => { dispatch({ type: "ADD_NOTE", payload: note }) };
  const deleteNote = (note) => { dispatch({ type: "DELETE_NOTE", payload: note }) };

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
      <CanvasForm
        addNote={addNote}
      />
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
