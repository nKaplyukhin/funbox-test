import "./App.css";
import React, { useRef } from "react";
import { CoordField } from "./CoordField";

const App = () => {
  const ref = useRef();

  return (
    <div className="App">
      <CoordField refProp={ref} />
      <div className="map" ref={ref}></div>
    </div>
  );
};

export default App;
