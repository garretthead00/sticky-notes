import React, { useEffect, useState } from "react";
import "./styles.scss";

const StickyNote = (props) => {
  const { note, isSelected } = props;
  const [currentNote, setCurrentNote] = useState({});


  useEffect(() => {
    if(props.isSelected) {
      console.log("STICKY SELECTED!");
      setCurrentNote(props.note);
      setObservers();
    } else {

      observer?.disconnect();
    }

  }, [props.isSelected]);

  let observer;
  function setObservers(){
    const elem = document.getElementById(`note_${currentNote.id}`);
    let prevWidth
      observer = new ResizeObserver(changes => {
        for(const change of changes){
          if(change.contentRect.width === prevWidth) return
          prevWidth = change.contentRect.width;
          updateNoteText();
        }
      });
      observer.observe(elem)
  }


  const deleteNote = (note) => {
    props.deleteNote(note);
  };

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

  const updateNoteText = () => {
    const noteEl = document.getElementById(`note_${currentNote.id}`);
    const divTextEl = document.getElementById(`note_text_${currentNote.id}`);
    if(divTextEl) {
      let fontSize = window?.getComputedStyle(divTextEl, null).getPropertyValue('font-size');
      const maxFontSize = parseInt(noteEl.clientHeight / 6);
      if (divTextEl.textContent === "") {
        divTextEl.style.fontSize = `${maxFontSize}px`;
      } else {
        if (divTextEl.clientHeight >= noteEl.clientHeight - 28) {
          while (divTextEl.clientHeight >= noteEl.clientHeight - 28) {
            const thisfontSizeToDec = parseInt(
              window.getComputedStyle(divTextEl).fontSize,
              10
            );
            divTextEl.style.fontSize = `clamp(0px, ${
              thisfontSizeToDec < 1
                ? thisfontSizeToDec - 0.1
                : thisfontSizeToDec - 1
            }px, ${maxFontSize}px)`;
          }
        } else {
          while (
            divTextEl.clientHeight < noteEl.clientHeight - 28 &&
            fontSize < maxFontSize
          ) {
            const thisfontSizeToInc = parseInt(
              window.getComputedStyle(divTextEl).fontSize,
              10
            );
            divTextEl.style.fontSize = `clamp(0px, ${
              thisfontSizeToInc < 1
                ? thisfontSizeToInc + 0.1
                : thisfontSizeToInc + 1
            }px, ${maxFontSize}px)`;
          }
        }
      }
    } 
  };

  return (
    <div
      id={`note_${currentNote.id}`}
      className={`note ${isSelected ? "note-selected" : ""}`}
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
        id={`note_text_${currentNote.id}`}
        className="divText"
        contentEditable="true"
        onKeyDown={() => updateNoteText()}
        onBlur={(event) => updateNote(event)}
        value={currentNote.text}
      ></div>
    </div>
  );
};

export default StickyNote;
