import React, { useReducer, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import "./styles.scss";

// COMPONENTS
import StickyNote from "../StickyNote";
import TextArea from "../TextArea";
import ToolBar, { MENU_IDS } from "../ToolBar";
import Resizer from "../Resizer";
import ContentWrapper from "../ContentWrapper";

// REDUCERS
import notesReducer, {
  NOTES_REDUCER_ACTIONS,
} from "../../reducers/notesReducer";
import textAreReducer, {
  TEXT_AREA_REDUCER_ACTIONS,
} from "../../reducers/textAreaReducer";


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
  const [selectedContent, setSelectedContent] = useState("");

  const [resizersState, setResizers] = useState([]);
  const [contentWrapperState, setContentWrapper] = useState([]);


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
    setResizers([...resizersState, { id: uuid() }]);
  };

  const addContentWrapper = () => {
    console.log(`contentWrappers: ${contentWrapperState.length}`);
    setContentWrapper([...contentWrapperState, { id: uuid() }]);
  };

  const selectContent = (content) => {
    if(content){
      setSelectedContent(content);
      console.log(`selected content with id: ${content} | current selectedContent: ${selectedContent}`);
    }
    else {
      setSelectedContent("");
      console.log(`selected content with id: ${undefined} | current selectedContent: ${selectedContent}`);
    }
    
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
        case MENU_IDS.EMOJI:
        console.log(`add contentWrapper`);
        addContentWrapper();
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
      onMouseUp={() => selectContent()}
    >
      <ToolBar selectTool={selectTool} />
      {/* {notesState.notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          dropNote={dropContent}
          deleteNote={deleteNote}
          selectNote={selectContent}
          updateNote={updateNote}
          isSelected={note?.id === setSelectedContent?.id}
        />
      ))} */}
      {textAreasState.textAreas.map((textArea) => (
        <TextArea
          key={textArea.id}
          dropTextArea={dropContent}
          isSelected={textArea?.id === selectedContent}
          selectTextArea={selectContent}
          textArea={textArea}
        />
      ))}
      {resizersState.map((resizer) => (
        <Resizer key={resizer.id} dropItem={dropContent} />
      ))}
      {notesState.notes.map((note) => (
        <ContentWrapper
        key={note.id}
        isSelected={note?.id === selectedContent}
        selectContent={selectContent}
        contentId={note.id}
        // id={`wrapper-${note.id}`}
        >
        <StickyNote
          key={note.id}
          note={note}
          dropNote={dropContent}
          deleteNote={deleteNote}
          selectNote={selectContent}
          updateNote={updateNote}
          isSelected={note?.id === selectedContent}
        />
        </ContentWrapper>
      ))}
    </div>
  );
};

export default Canvas;
