import { useState } from "react";
import { render, screen } from "@testing-library/react";
import "./App.css";
import Card from "./Card";

function App() {
  return (
    <>
      <div className="bg-blur"></div>

      <Card />
    </>
  );
}

export default App;
