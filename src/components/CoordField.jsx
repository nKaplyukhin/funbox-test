import { useState } from "react";
import { useMap } from "../hooks/useMap";
import { ACTION_TYPE } from "../constants/constant";
import styled from "styled-components";
import { CoordsList } from "./CoordsList";

const StyledCoordField = styled("div")`
  position: relative;
  width: 100%;
  padding-top: 10px;
  margin-right: 20px;
  max-width: 150px;
`;

const StyledInput = styled("input")`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledError = styled("error")`
  font-size: 12px;
  color: red;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Input = ({ map, setMap }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleKey = (e) => {
    setError(false);
    if (value.length > 0) {
      if (e.code === "Enter") {
        let flag = false;
        map.forEach((item) => {
          if (item.name === value) {
            setError(true);
            flag = true;
          }
        });
        if (!flag) {
          setMap(ACTION_TYPE.add, value);
          setValue("");
        }
      }
    }
  };

  return (
    <>
      <StyledInput
        type="text"
        value={value}
        placeholder="Введите название точки"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        onKeyPress={handleKey}
      />
      {error && <StyledError>данное название используется</StyledError>}
    </>
  );
};

export const CoordField = ({ refProp }) => {
  const [map, setMap] = useMap(refProp, [55.73, 37.75]);

  return (
    <StyledCoordField>
      <Input map={map} setMap={setMap} />
      <CoordsList coord={map} setMap={setMap} />
    </StyledCoordField>
  );
};
