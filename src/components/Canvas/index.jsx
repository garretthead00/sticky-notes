import React, { useReducer } from "react";

import "./styles.scss";

// COMPONENTS
import CanvasForm from "../CanvasForm";

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

  const addNote = (note) => {
    dispatch({ type: "ADD_NOTE", payload: note });
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
      <CanvasForm
        addNote={addNote}
      />
      {notesState.notes.map((note) => (
        <div
          key={note.id}
          className="note"
          style={{ transform: `rotate(${note.rotate}deg)` }}
          draggable="true"
          onDragEnd={dropNote}
        >
          <div
            className="close-note"
            onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <pre className="text">{note.text}</pre>
        </div>
      ))}
    </div>
  );
};

export default Canvas;
