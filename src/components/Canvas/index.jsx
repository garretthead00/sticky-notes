import React, { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.scss";

// COMPONENTS
import StickyNote from "../StickyNote";
import TextArea from "../TextArea";
import ToolBar, { MENU_IDS } from "../ToolBar";

// REDUCERS
import notesReducer, {
  NOTES_REDUCER_ACTIONS,
} from "../../reducers/notesReducer";
import textAreReducer, {
  TEXT_AREA_REDUCER_ACTIONS,
} from "../../reducers/textAreaReducer";
import Resizer from "../Resizer";

const initialNoteState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

const initialTextAreaState = {
  lastTextAreaCreated: null,
  totalTextAreas: 0,
  textAreas: [],
};

const Canvas = () => {
  const [notesState, dispatchNote] = useReducer(notesReducer, initialNoteState);
  const [textAreasState, dispatchTextArea] = useReducer(
    textAreReducer,
    initialTextAreaState
  );
  const [selectedContent, setSelectedContent] = useState();

  const [resizersState, setResizers] = useState([]);

  const addNote = () => {
    const newNote = {
      id: uuid(),
      text: "",
      rotate: Math.floor(Math.random() * 20),
    };
    dispatchNote({ type: NOTES_REDUCER_ACTIONS.ADD_NOTE, payload: newNote });
  };
  const deleteNote = (note) => {
    dispatchNote({ type: NOTES_REDUCER_ACTIONS.DELETE_NOTE, payload: note });
  };
  const updateNote = (note) => {
    dispatchNote({ type: NOTES_REDUCER_ACTIONS.UPDATE_NOTE, payload: note });
  };

  const addTextArea = () => {
    const newNote = {
      id: uuid(),
      text: "",
    };
    dispatchTextArea({
      type: TEXT_AREA_REDUCER_ACTIONS.ADD_TEXT_AREA,
      payload: newNote,
    });
  };

  const addResizer = () => {
    console.log(`resizers: ${resizersState.length}`);
    setResizers([...resizersState, { id: "1" }]);
  };

  const selectContent = (note) => {
    setSelectedContent(note);
    console.log(`selected note with id: ${note.id}`);
  };

  const dropContent = (event) => {
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
        addTextArea();
        break;
      case MENU_IDS.IMAGE:
        console.log(`add resizer`);
        addResizer();
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
      onClick={() => setSelectedContent()}
    >
      <ToolBar selectTool={selectTool} />
      {notesState.notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          dropNote={dropContent}
          deleteNote={deleteNote}
          selectNote={selectContent}
          updateNote={updateNote}
          isSelected={note?.id === setSelectedContent?.id}
        />
      ))}
      {textAreasState.textAreas.map((textArea) => (
        <TextArea
          key={textArea.id}
          dropTextArea={dropContent}
          isSelected={textArea?.id === setSelectedContent?.id}
          selectTextArea={selectContent}
          textArea={textArea}
        />
      ))}
      {resizersState.map((resizer) => (
        <Resizer dropItem={dropContent} />
      ))}
    </div>
  );
};

export default Canvas;
