export const TEXT_AREA_REDUCER_ACTIONS = {
  ADD_TEXT_AREA: "ADD_TEXT_AREA",
  UPDATE_TEXT_AREA: "UPDATE_TEXT_AREA",
  DELETE_TEXT_AREA: "DELETE_TEXT_AREA",
};

const textAreaReducer = (prevState, action) => {
  switch (action.type) {
    case TEXT_AREA_REDUCER_ACTIONS.ADD_TEXT_AREA: {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        totalTextAreas: prevState.textAreas.length + 1,
        textAreas: [...prevState.textAreas, action.payload],
      };
      console.log("ADD_TEXT_AREA", newState);
      return newState;
    }
    case TEXT_AREA_REDUCER_ACTIONS.UPDATE_TEXT_AREA: {
      const newState = {
        ...prevState,
        textAreas: [
          ...prevState.textAreas.filter(
            (textArea) => textArea.id !== action.payload.id
          ),
          action.payload,
        ],
      };
      console.log("UPDATE_TEXT_AREA", newState);
      return newState;
    }
    case TEXT_AREA_REDUCER_ACTIONS.DELETE_TEXT_AREA: {
      const newState = {
        ...prevState,
        totalTextAreas: prevState.notes.length - 1,
        textAreas: prevState.notes.filter(
          (textArea) => textArea.id !== action.payload.id
        ),
      };
      console.log("DELETE_TEXT_AREA", newState);
      return newState;
    }
    default: {
    }
  }
};

export default textAreaReducer;
