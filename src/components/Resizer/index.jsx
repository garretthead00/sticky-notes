import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "./styles.scss";

const Resizer = (props) => {
  const dropItem = (event) => {
    props.dropItem(event);
  };

  const enableContent = (event) => {
    event.stopPropagation();
    event.preventDefault();
    makeResizable(event);
    //makeRotatable(event);
  };

  function makeResizable(event) {
    console.log("makeResizable...", event.target);
    const contentWrapper = document.getElementById("contentWrapper");
    const resizers = document.querySelectorAll(".resizer");
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0; i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener("mousedown", function (e) {
        e.preventDefault();
        original_width = parseFloat(
          getComputedStyle(contentWrapper, null)
            .getPropertyValue("width")
            .replace("px", "")
        );
        original_height = parseFloat(
          getComputedStyle(contentWrapper, null)
            .getPropertyValue("height")
            .replace("px", "")
        );
        original_x = contentWrapper.getBoundingClientRect().left;
        original_y = contentWrapper.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener("mousemove", resizeStart, false);
        window.addEventListener("mouseup", resizeStop, false);
      });

      function resizeStart(e) {
        console.log("resizing start...");
        if (currentResizer.classList.contains("bottom-right")) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height + (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            contentWrapper.style.width = width + "px";
          }
          if (height > minimum_size) {
            contentWrapper.style.height = height + "px";
          }
        } else if (currentResizer.classList.contains("bottom-left")) {
          const height = original_height + (e.pageY - original_mouse_y);
          const width = original_width - (e.pageX - original_mouse_x);
          if (height > minimum_size) {
            contentWrapper.style.height = height + "px";
          }
          if (width > minimum_size) {
            contentWrapper.style.width = width + "px";
            contentWrapper.style.left =
              original_x + (e.pageX - original_mouse_x) + "px";
          }
        } else if (currentResizer.classList.contains("top-right")) {
          const width = original_width + (e.pageX - original_mouse_x);
          const height = original_height - (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            contentWrapper.style.width = width + "px";
          }
          if (height > minimum_size) {
            contentWrapper.style.height = height + "px";
            contentWrapper.style.top =
              original_y + (e.pageY - original_mouse_y) + "px";
          }
        } else {
          const width = original_width - (e.pageX - original_mouse_x);
          const height = original_height - (e.pageY - original_mouse_y);
          if (width > minimum_size) {
            contentWrapper.style.width = width + "px";
            contentWrapper.style.left =
              original_x + (e.pageX - original_mouse_x) + "px";
          }
          if (height > minimum_size) {
            contentWrapper.style.height = height + "px";
            contentWrapper.style.top =
              original_y + (e.pageY - original_mouse_y) + "px";
          }
        }
      }

      function resizeStop() {
        console.log("resizing stop...");
        window.removeEventListener("mousemove", resizeStart, false);
        window.removeEventListener("mouseup", resizeStop, false);
      }
    }
  }

  function makeRotatable(event) {
    console.log("makeRotatable...", event.target);
    event.stopPropagation();
    event.preventDefault();
    const contentWrapper = document.getElementById("contentWrapper");
    const rectBounds = contentWrapper.getBoundingClientRect();

    window.addEventListener("mousemove", rotateStart, false);
    window.addEventListener("mouseup", rotateStop, false);

    function rotateStart(event) {
      console.log("rotating start...");
      var centerX = rectBounds.left + rectBounds.width / 2;
      var centerY = rectBounds.top + rectBounds.height / 2;
      var radians = Math.atan2(
        event.clientY - centerY,
        event.clientX - centerX
      );
      var degree = radians * (180 / Math.PI) + 90;
      contentWrapper.style.transform = "rotate(" + degree + "deg)";
    }

    function rotateStop() {
      console.log("rotating stop...");
      window.removeEventListener("mousemove", rotateStart, false);
      window.removeEventListener("mouseup", rotateStop, false);
    }
  }

  return (
    <div
      id="contentWrapper"
      className="resizable"
      draggable="true"
      onDragEnd={dropItem}
      onClick={(event) => enableContent(event)}
    >
      <div className="resizers">
        <div className="resizer top-left"></div>
        <div className="resizer top-right"></div>
        <div className="resizer bottom-left"></div>
        <div className="resizer bottom-right"></div>
      </div>
      <div className="rotator" onMouseDown={(event) => makeRotatable(event)}>
        <Icon.ArrowRepeat />
      </div>
    </div>
  );
};

export default Resizer;
