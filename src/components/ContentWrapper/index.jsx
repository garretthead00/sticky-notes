import React, { useEffect, useState } from "react";
import "./styles.scss";

const ContentWrapper = (props) => {

  const [isSelectedContent, setIsSelectedContent] = useState(false);

  var box;
  var boxWrapper;
  const minWidth = 40;
  const minHeight = 40;
  var initX, initY, mousePressX, mousePressY, initW, initH, initRotate;

  // Wrapper resizer and rotator points.
  var rightMid, leftMid, topMid, bottomMid, leftTop, rightTop, rightBottom, leftBottom, rotate;

  const ELEMENT_IDS = {
    BOX_WRAPPER: `box-wrapper_${props.contentId}`,
  };

//   useEffect(() => {
//     console.group("------initializing Content Wrapper....");
//     console.log(`props for ${contentId}`);
//     console.log(props);
//     console.log(`isSelectedContent?: ${isSelectedContent} | props.isSelected?: ${isSelected}`);
//     console.log(children.props);
//     console.groupEnd();
//   }, []);

  useEffect(() => {
    setIsSelectedContent(props.isSelected);
    makeResizable();
    makeRotatable();
  }, [props.isSelected]);

  const selectContent = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const divTextEl = document.getElementById(`box-wrapper_${props.contentId}`);
    divTextEl.focus();
    setIsSelectedContent(true);
    makeResizable();
    makeRotatable();
    props.selectContent(props.contentId);
  };

  function makeDraggable(event) {
    if (!isSelectedContent) return false;
    console.log('make draggable...');
    event.stopPropagation();
    event.preventDefault();
    boxWrapper = document.getElementById(`box-wrapper_${props.contentId}`);

    if (event.target.className.indexOf("dot") > -1) {
      return;
    }

    initX = boxWrapper.offsetLeft;
    initY = boxWrapper.offsetTop;
    mousePressX = event.clientX;
    mousePressY = event.clientY;

    function eventMoveHandler(event) {
      repositionElement(
        initX + (event.clientX - mousePressX),
        initY + (event.clientY - mousePressY)
      );
    }

    boxWrapper.addEventListener("mousemove", eventMoveHandler, false);
    boxWrapper.addEventListener(
      "mouseup",
      function eventEndHandler() {
        boxWrapper.removeEventListener("mousemove", eventMoveHandler, false);
        boxWrapper.removeEventListener("mouseup", eventEndHandler);
      },
      false
    );
  }

  function repositionElement(x, y) {
    boxWrapper = document.getElementById(`box-wrapper_${props.contentId}`);
    boxWrapper.style.left = x + "px";
    boxWrapper.style.top = y + "px";
  }
  function resize(w, h) {
    boxWrapper = document.getElementById(`box-wrapper_${props.contentId}`);
    boxWrapper.style.width = w + "px";
    boxWrapper.style.height = h + "px";
  }

  function getCurrentRotation(el) {
    var st = window.getComputedStyle(el, null);
    var tm =
      st.getPropertyValue("-webkit-transform") ||
      st.getPropertyValue("-moz-transform") ||
      st.getPropertyValue("-ms-transform") ||
      st.getPropertyValue("-o-transform") ||
      st.getPropertyValue("transform") ||
      "none";
    if (tm !== "none") {
      var values = tm.split("(")[1].split(")")[0].split(",");
      var angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );
      return angle < 0 ? angle + 360 : angle;
    }
    return 0;
  }

  function makeResizable() {
    if (!isSelectedContent) return false;
    console.log(`make resizable...${props.isSelected}`);
    rightMid = document.getElementById(`right-mid_${props.contentId}`);
    leftMid = document.getElementById(`left-mid_${props.contentId}`);
    topMid = document.getElementById(`top-mid_${props.contentId}`);
    bottomMid = document.getElementById(`bottom-mid_${props.contentId}`);
    leftTop = document.getElementById(`left-top_${props.contentId}`);
    rightTop = document.getElementById(`right-top_${props.contentId}`);
    rightBottom = document.getElementById(`right-bottom_${props.contentId}`);
    leftBottom = document.getElementById(`left-bottom_${props.contentId}`);

    rightMid.addEventListener("mousedown", (e) =>
      resizeHandler(e, false, false, true, false)
    );
    leftMid.addEventListener("mousedown", (e) =>
      resizeHandler(e, true, false, true, false)
    );
    topMid.addEventListener("mousedown", (e) =>
      resizeHandler(e, false, true, false, true)
    );
    bottomMid.addEventListener("mousedown", (e) =>
      resizeHandler(e, false, false, false, true)
    );
    leftTop.addEventListener("mousedown", (e) =>
      resizeHandler(e, true, true, true, true)
    );
    rightTop.addEventListener("mousedown", (e) =>
      resizeHandler(e, false, true, true, true)
    );
    rightBottom.addEventListener("mousedown", (e) =>
      resizeHandler(e, false, false, true, true)
    );
    leftBottom.addEventListener("mousedown", (e) =>
      resizeHandler(e, true, false, true, true)
    );

    function resizeHandler(
      event,
      left = false,
      top = false,
      xResize = false,
      yResize = false
    ) {
      boxWrapper = document.getElementById(`box-wrapper_${props.contentId}`);
      initX = boxWrapper.offsetLeft;
      initY = boxWrapper.offsetTop;
      mousePressX = event.clientX;
      mousePressY = event.clientY;

      initW = boxWrapper.offsetWidth;
      initH = boxWrapper.offsetHeight;

      initRotate = getCurrentRotation(boxWrapper);
      var initRadians = (initRotate * Math.PI) / 180;
      var cosFraction = Math.cos(initRadians);
      var sinFraction = Math.sin(initRadians);
      function eventMoveHandler(event) {
        var wDiff = event.clientX - mousePressX;
        var hDiff = event.clientY - mousePressY;
        var rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff;
        var rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff;

        var newW = initW,
          newH = initH,
          newX = initX,
          newY = initY;

        if (xResize) {
          if (left) {
            newW = initW - rotatedWDiff;
            if (newW < minWidth) {
              newW = minWidth;
              rotatedWDiff = initW - minWidth;
            }
          } else {
            newW = initW + rotatedWDiff;
            if (newW < minWidth) {
              newW = minWidth;
              rotatedWDiff = minWidth - initW;
            }
          }
          newX += 0.5 * rotatedWDiff * cosFraction;
          newY += 0.5 * rotatedWDiff * sinFraction;
        }

        if (yResize) {
          if (top) {
            newH = initH - rotatedHDiff;
            if (newH < minHeight) {
              newH = minHeight;
              rotatedHDiff = initH - minHeight;
            }
          } else {
            newH = initH + rotatedHDiff;
            if (newH < minHeight) {
              newH = minHeight;
              rotatedHDiff = minHeight - initH;
            }
          }
          newX -= 0.5 * rotatedHDiff * sinFraction;
          newY += 0.5 * rotatedHDiff * cosFraction;
        }

        resize(newW, newH);
        repositionElement(newX, newY);
      }

      window.addEventListener("mousemove", eventMoveHandler, false);
      window.addEventListener(
        "mouseup",
        function eventEndHandler() {
          window.removeEventListener("mousemove", eventMoveHandler, false);
          window.removeEventListener("mouseup", eventEndHandler);
        },
        false
      );
    }
  }

  function makeRotatable() {
    if (!isSelectedContent) return false;
    console.log(`make rotatable...${props.isSelected}`);
    boxWrapper = document.getElementById(`box-wrapper_${props.contentId}`);
    rotate = document.getElementById(`rotate_${props.contentId}`);

    function rotationHandler(event) {
      var arrow = boxWrapper.querySelector("#box");
      var arrowRects = arrow.getBoundingClientRect();
      var arrowX = arrowRects.left + arrowRects.width / 2;
      var arrowY = arrowRects.top + arrowRects.height / 2;

      function eventMoveHandler(event) {
        var angle =
          Math.atan2(event.clientY - arrowY, event.clientX - arrowX) +
          Math.PI / 2;
        rotateBox((angle * 180) / Math.PI);
      }

      window.addEventListener("mousemove", eventMoveHandler, false);
      window.addEventListener(
        "mouseup",
        function () {
          window.removeEventListener("mousemove", eventMoveHandler, false);
        },
        false
      );
    }

    rotate.addEventListener(
      "mousedown",
      (event) => rotationHandler(event),
      false
    );
  }

  function rotateBox(deg) {
    boxWrapper = document.getElementById(`box-wrapper_${props.contentId}`);
    boxWrapper.style.transform = `rotate(${deg}deg)`;
  }

  return (
    <div
      className="box-wrapper"
      id={`box-wrapper_${props.contentId}`}
      onClick={(event) => selectContent(event)}
      onMouseDown={(event) => makeDraggable(event)}
      style={{ transform: `rotate(${props.children.props.note.rotate}deg)` }}
    >
      <div className="box" id="box">
        {isSelectedContent && (
          <div>
            <div
              className="dot rotate"
              id={`rotate_${props.contentId}`}
              onMouseDown={(event) => makeRotatable(event)}
            ></div>
            <div
              className="dot left-top"
              id={`left-top_${props.contentId}`}
              onMouseDown={(event) => makeResizable(event)}
            ></div>
            <div
              className="dot left-bottom"
              id={`left-bottom_${props.contentId}`}
            ></div>
            <div
              className="dot top-mid"
              id={`top-mid_${props.contentId}`}
            ></div>
            <div
              className="dot bottom-mid"
              id={`bottom-mid_${props.contentId}`}
            ></div>
            <div
              className="dot left-mid"
              id={`left-mid_${props.contentId}`}
            ></div>
            <div
              className="dot right-mid"
              id={`right-mid_${props.contentId}`}
            ></div>
            <div
              className="dot right-bottom"
              id={`right-bottom_${props.contentId}`}
            ></div>
            <div
              className="dot right-top"
              id={`right-top_${props.contentId}`}
            ></div>
            <div className="rotate-link"></div>
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
};

export default ContentWrapper;
