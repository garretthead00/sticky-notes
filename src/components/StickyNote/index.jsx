import React from "react";
import "./styles.scss";

const StickyNote = (props) => {
  const { note } = props;
  let clientX, clientY, currentSelectedNote, parent;

  const deleteNote = (note) => {
    props.deleteNote(note);
  };

  const dropNote = (event) => {
    props.dropNote(event);
  };

  const rotateNote = (event, note) => {
    console.log("rotating note", note);
    event.stopPropagation();
    event.preventDefault();
    currentSelectedNote = document.getElementById(`note_${note.id}`);
    var arrowRects = currentSelectedNote.getBoundingClientRect();
    clientX = arrowRects.left + arrowRects.width / 2;
    clientY = arrowRects.top + arrowRects.height / 2;
    window.addEventListener("mousemove", rotateStart, false);
    window.addEventListener("mouseup", rotateStop, false);
  };

  function rotateStart(e) {
    var radians = Math.atan2(e.clientY - clientY, e.clientX - clientX);
    var deg = radians * (180 / Math.PI) + 20;
    currentSelectedNote.style.transform = "rotate(" + deg + "deg)";
  }

  function rotateStop(e) {
    currentSelectedNote = null;
    clientX = 0;
    clientY = 0;
    window.removeEventListener("mousemove", rotateStart, false);
    window.removeEventListener("mouseup", rotateStop, false);
  }

  return (
    <div
      id={`note_${note.id}`}
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
      <div
        className="rotate-note"
        onMouseDown={(event) => rotateNote(event, note)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <pre className="text">{note.text}</pre>
    </div>
  );
};

export default StickyNote;
