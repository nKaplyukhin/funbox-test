import "./App.css";
import React from "react";
import { CoordField } from "./CoordField";
import { Map } from "./Map";

const App = () => {
  return (
    <div className="App">
      <CoordField />
      <Map />
    </div>
  );
};

export default App;
