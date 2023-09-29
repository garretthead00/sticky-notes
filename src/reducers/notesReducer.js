const notesReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        totalNotes: prevState.notes.length + 1,
        notes: [...prevState.notes, action.payload],
      };
      console.log("ADD_NOTE", newState);
      return newState;
    }
    case "UPDATE_NOTE": {
      const newState = {
        ...prevState,
        notes: [
          ...prevState.notes.filter((note) => note.id !== action.payload.id),
          action.payload,
        ],
      };
      console.log("UPDATE_NOTE", newState);
      return newState;
    }
    case "DELETE_NOTE": {
      const newState = {
        ...prevState,
        totalNotes: prevState.notes.length - 1,
        notes: prevState.notes.filter((note) => note.id !== action.payload.id),
      };
      console.log("DELETE_NOTE", newState);
      return newState;
    }
    default: {
    }
  }
};

export default notesReducer;
