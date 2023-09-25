import React, { useEffect, useState } from "react";
import "./styles.scss";

const StickyNote = (props) => {
  const { note, isSelected } = props;
  const [currentNote, setCurrentNote] = useState({});
  let clientX, clientY, currentSelectedNote;

  useEffect(() => {
    setCurrentNote(note);
  }, []);

  useEffect(() => {
    setCurrentNote(note);
  }, [props.note]);

  const deleteNote = (note) => {
    props.deleteNote(note);
  };

  const dropNote = (event) => {
    props.dropNote(event);
  };

  const selectNote = (event, note) => {
    event.stopPropagation();
    event.preventDefault();
    const divTextEl = document.getElementById(`note_text_${currentNote.id}`);
    divTextEl.focus();
    props.selectNote(note);
  };

  function resizeNote(event) {
    event.stopPropagation();
    event.preventDefault();
    currentSelectedNote = document.getElementById(`note_${currentNote.id}`);
    window.addEventListener("mousemove", resizeStart, false);
    window.addEventListener("mouseup", resizeStop, false);
  }

  function resizeStart(event) {
    const noteText = document.getElementById(`note_text_${currentNote.id}`);
    const diffX = event.clientX - currentSelectedNote.offsetLeft;
    const diffY = event.clientY - currentSelectedNote.offsetTop;
    const newSize = diffX < diffY ? diffX : diffY;
    currentSelectedNote.style.width = newSize + "px";
    currentSelectedNote.style.height = newSize + "px";

    //console.log(`noteWidth: ${currentSelectedNote.clientWidth}; noteWidth: ${currentSelectedNote.clientWidth} newSize ${newSize}`);
    //noteText.style.fontSize = `clamp(16px, ${newSize / 4}px, 64px)`;
  }

  function resizeStop(event) {
    currentSelectedNote = null;
    window.removeEventListener("mousemove", resizeStart, false);
    window.removeEventListener("mouseup", resizeStop, false);
  }

  const rotateNote = (event, note) => {
    event.stopPropagation();
    event.preventDefault();
    currentSelectedNote = document.getElementById(`note_${currentNote.id}`);
    let arrowRects = currentSelectedNote.getBoundingClientRect();
    clientX = arrowRects.left + arrowRects.width / 2;
    clientY = arrowRects.top + arrowRects.height / 2;
    window.addEventListener("mousemove", rotateStart, false);
    window.addEventListener("mouseup", rotateStop, false);
  };

  function rotateStart(event) {
    let radians = Math.atan2(event.clientY - clientY, event.clientX - clientX);
    let deg = radians * (180 / Math.PI) + 20;
    currentSelectedNote.style.transform = "rotate(" + deg + "deg)";
  }

  function rotateStop(event, note) {
    currentSelectedNote = null;
    clientX = 0;
    clientY = 0;
    window.removeEventListener("mousemove", rotateStart, false);
    window.removeEventListener("mouseup", rotateStop, false);
  }

  function updateNote(event) {
    event.preventDefault();
    event.stopPropagation();

    const newNote = {
      ...currentNote,
      text: event.target.value,
    };
    setCurrentNote(newNote);
    props.updateNote(currentNote);
  }

  const updateNoteText = (event) => {
    const noteEl = document.getElementById(`note_${currentNote.id}`);
    const divTextEl = document.getElementById(`note_text_${currentNote.id}`);
    const fontSize = parseInt(window.getComputedStyle(divTextEl).fontSize, 10);

    console.log(
      `note w x h: | ${noteEl.clientWidth} x ${noteEl.clientHeight} |`
    );
    console.log(
      `textarea w x h: | ${divTextEl.clientWidth} x ${divTextEl.clientHeight} | => fontSize: ${fontSize}`
    );

    // Default & Reset font sizing
    if (divTextEl.textContent === "") {
      console.log("empty content; reset font");
      divTextEl.style.fontSize = "24px";
    } else {
      // DELETE or BACKSPACE
      if (event.keyCode === 8 || event.keyCode === 46) {
        if (divTextEl.clientWidth <= noteEl.clientWidth - 24) {
          divTextEl.style.fontSize = `${
            fontSize < 1 ? fontSize + 0.1 : fontSize + 1
          }px`;
        }
        if (divTextEl.clientHeight <= noteEl.clientHeight - 24) {
          divTextEl.style.fontSize = `${
            fontSize < 1 ? fontSize + 0.1 : fontSize + 1
          }px`;
        }
      }

      // Increase font based on width
      if (divTextEl.clientWidth >= noteEl.clientWidth - 24) {
        // divTextEl.style.fontSize = `clamp(8px, ${fontSize - 1}px, 64px)`;
        while (divTextEl.clientWidth >= noteEl.clientWidth - 24) {
          const thisfontSize = parseInt(
            window.getComputedStyle(divTextEl).fontSize,
            10
          );
          divTextEl.style.fontSize = `${
            thisfontSize < 1 ? thisfontSize - 0.1 : thisfontSize - 1
          }px`; //`clamp(8px, ${thisfontSize - 1}px, 64px)`;
        }
      }

      // Increase font based on width
      if (divTextEl.clientHeight >= noteEl.clientHeight - 24) {
        // divTextEl.style.fontSize = `clamp(8px, ${fontSize - 1}px, 64px)`;
        while (divTextEl.clientHeight >= noteEl.clientHeight - 24) {
          const thisfontSize = parseInt(
            window.getComputedStyle(divTextEl).fontSize,
            10
          );
          divTextEl.style.fontSize = `${
            thisfontSize < 1 ? thisfontSize - 0.1 : thisfontSize - 1
          }px`; //`clamp(8px, ${thisfontSize - 1}px, 64px)`;
        }
      }
    }
  };

  return (
    <div
      id={`note_${currentNote.id}`}
      className={`note ${isSelected ? "note-selected" : ""}`}
      style={{ transform: `rotate(${currentNote.rotate}deg)` }}
      draggable="true"
      onDragEnd={dropNote}
      onClick={(event) => selectNote(event, currentNote)}
    >
      <div className="close-note" onClick={() => deleteNote(currentNote)}>
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
        onMouseDown={(event) => rotateNote(event, currentNote)}
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
      <div
        className="resize-note"
        onMouseDown={(event) => resizeNote(event, currentNote)}
      ></div>
      <div
        id={`note_text_${currentNote.id}`}
        className="divText"
        contentEditable="true"
        onKeyUp={(event) => updateNoteText(event)}
        onBlur={(event) => updateNote(event)}
        value={currentNote.text}
      ></div>
    </div>
  );
};

export default StickyNote;
