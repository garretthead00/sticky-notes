import React from "react";
import "./App.scss";

// Components
import Canvas from "./components/Canvas";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sticky Notes</h1>
      </header>
      <Canvas/>
    </div>
  );
}

export default App;
