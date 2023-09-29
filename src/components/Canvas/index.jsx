import React, { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.scss";

// COMPONENTS
import StickyNote from "../StickyNote";
import ToolBar, { MENU_IDS } from "../ToolBar";

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

  const addNote = () => {
    console.log(`adding Note...`);
    const newNote = {
      id: uuid(),
      text: "",
      rotate: Math.floor(Math.random() * 20),
    };
    dispatch({ type: "ADD_NOTE", payload: newNote });
  };
  const deleteNote = (note) => {
    dispatch({ type: "DELETE_NOTE", payload: note });
  };
  const updateNote = (note) => {
    dispatch({ type: "UPDATE_NOTE", payload: note });
  };

  const selectNote = (note) => {
    setSelectedNote(note);
    console.log(`selected note with id: ${note.id}`);
  };

  const dropNote = (event) => {
    event.target.style.top = `${event.pageY - 50}px`;
    event.target.style.left = `${event.pageX - 50}px`;
  };

  const dragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const selectTool = (toolId) => {
    console.log(`selected tool: ${toolId}`);
    switch (toolId) {
      case MENU_IDS.STICKY_NOTE:
        console.log(`add note`);
        addNote();
        break;
      case MENU_IDS.TEXT_AREA:
        console.log(`add text area`);
        break;
      default:
        console.log(`nothing`);
        break;
    }
  };

  return (
    <div
      className="canvas"
      onDragOver={dragOver}
      onClick={() => setSelectedNote()}
    >
      {/* <CanvasForm addNote={addNote} /> */}
      <ToolBar selectTool={selectTool} />
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
