import { useState } from "react";

import "./App.css";
import Card from "./Card";

function App() {
  return (
    <>
      <div className="app">
        <div className="header">
          <h1>Memory Game</h1>
        </div>
        <Card />
      </div>
    </>
  );
}

export default App;
