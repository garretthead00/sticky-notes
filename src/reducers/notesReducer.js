export const NOTES_REDUCER_ACTIONS = {
  ADD_NOTE: "ADD_NOTE",
  UPDATE_NOTE: "UPDATE_NOTE",
  DELETE_NOTE: "DELETE_NOTE",
};
const notesReducer = (prevState, action) => {
  switch (action.type) {
    case NOTES_REDUCER_ACTIONS.ADD_NOTE: {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        totalNotes: prevState.notes.length + 1,
        notes: [...prevState.notes, action.payload],
      };
      return newState;
    }
    case NOTES_REDUCER_ACTIONS.UPDATE_NOTE: {
      const newState = {
        ...prevState,
        notes: [
          ...prevState.notes.filter((note) => note.id !== action.payload.id),
          action.payload,
        ],
      };
      return newState;
    }
    case NOTES_REDUCER_ACTIONS.DELETE_NOTE: {
      const newState = {
        ...prevState,
        totalNotes: prevState.notes.length - 1,
        notes: prevState.notes.filter((note) => note.id !== action.payload.id),
      };
      return newState;
    }
    default: {
    }
  }
};

export default notesReducer;
