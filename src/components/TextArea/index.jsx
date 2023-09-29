import React, { useEffect, useState } from "react";
import "./styles.scss";

const TextArea = (props) => {
  const { textArea, isSelected } = props;
  const [currentSelection, setCurrentSelection] = useState({});
  let clientX, clientY, currentSelectedTextArea;

  // useEffect(() => {
  //   setCurrentSelection(textArea);
  // }, []);

  useEffect(() => {
    setCurrentSelection(textArea);
  }, [textArea]);

  const dropTextArea = (event) => {
    console.log("drop text area...");
    props.dropTextArea(event);
  };

  const rotateTextArea = (event, textArea) => {
    event.stopPropagation();
    event.preventDefault();
    currentSelectedTextArea = document.getElementById(
      `textArea_${currentSelection.id}`
    );
    let arrowRects = currentSelectedTextArea.getBoundingClientRect();
    clientX = arrowRects.left + arrowRects.width / 2;
    clientY = arrowRects.top + arrowRects.height / 2;
    window.addEventListener("mousemove", rotateStart, false);
    window.addEventListener("mouseup", rotateStop, false);
  };

  function rotateStart(event) {
    let radians = Math.atan2(event.clientY - clientY, event.clientX - clientX);
    let deg = radians * (180 / Math.PI) + 20;
    currentSelectedTextArea.style.transform = "rotate(" + deg + "deg)";
  }

  function rotateStop(event, note) {
    currentSelectedTextArea = null;
    clientX = 0;
    clientY = 0;
    window.removeEventListener("mousemove", rotateStart, false);
    window.removeEventListener("mouseup", rotateStop, false);
  }

  const selectTextArea = (event, textArea) => {
    event.stopPropagation();
    event.preventDefault();
    const textElement = document.getElementById(
      `textArea_text_${currentSelection.id}`
    );
    const textLength = textElement.innerText.length;
    textElement.focus();
    props.selectTextArea(textArea);
  };

  return (
    <div
      id={`textArea_${currentSelection.id}`}
      className={`textArea ${isSelected ? "note-selected" : ""}`}
      draggable="true"
      onDragEnd={dropTextArea}
      onClick={(event) => selectTextArea(event, currentSelection)}
    >
      <div
        className="rotate-text-area"
        onMouseDown={(event) => rotateTextArea(event, currentSelection)}
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
      <div id={`textArea_text_${currentSelection.id}`} className="text-area-text" contentEditable="true"></div>
    </div>
  );
};

export default TextArea;
