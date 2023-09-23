import React from "react";
import "./styles.scss";

const StickyNote = (props) => {
  const { note } = props;

  const deleteNote = (note) => {
    props.deleteNote(note);
  };

  const dropNote = (event) => {
    props.dropNote(event);
  };

  return (
    <div
      className="note"
      style={{ transform: `rotate(${note.rotate}deg)` }}
      draggable="true"
      onDragEnd={dropNote}
    >
      <div className="close-note" onClick={() => deleteNote(note)}>
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
  );
};

export default StickyNote;
