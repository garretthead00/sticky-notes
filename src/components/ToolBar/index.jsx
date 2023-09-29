import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "./styles.scss";

export const MENU_IDS = {
  STICKY_NOTE: "tool-bar-sticky-note",
  TEXT_AREA: "tool-bar-text-area",
};

const ToolBar = (props) => {
  const selectTool = (event, menuId) => {
    event.stopPropagation();
    event.preventDefault();
    props.selectTool(menuId);
  };

  return (
    <div className="toolbar">
      <ul>
        <li
          key={MENU_IDS.STICKY_NOTE}
          id={MENU_IDS.STICKY_NOTE}
          onClick={(event) => {
            selectTool(event, MENU_IDS.STICKY_NOTE);
          }}
        >
          <Icon.Sticky />
        </li>
        <li
          key={MENU_IDS.TEXT_AREA}
          id={MENU_IDS.TEXT_AREA}
          onClick={(event) => {
            selectTool(event, MENU_IDS.TEXT_AREA);
          }}
        >
          <Icon.TextareaT />
        </li>
      </ul>
    </div>
  );
};

export default ToolBar;
