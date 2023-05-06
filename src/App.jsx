import "./App.css";
import React, { useRef } from "react";
import styled from "styled-components";
import { CoordField } from "./components/CoordField";

const Map = styled("div")`
  width: 100%;
  height: 50vw;
  max-height: 600px;
  padding: 0;
  margin: 0;
`;

const App = () => {
  const ref = useRef();

  return (
    <div className="App">
      <CoordField refProp={ref} />
      <Map ref={ref} />
    </div>
  );
};

export default App;
