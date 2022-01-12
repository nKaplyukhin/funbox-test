import { useState } from "react";
import { CoordsList } from "./CoordsList";
import "./CoordField.css";
import { useMap } from "../hooks/useMap";
import { ACTION_TYPE } from "../constants/constant";

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
      <input
        className="coordField__input"
        type="text"
        value={value}
        placeholder="Введите название точки"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        onKeyPress={handleKey}
      />
      {error && (
        <div className="coordField__error">данное название используется</div>
      )}
    </>
  );
};

export const CoordField = ({ refProp }) => {
  const [map, setMap] = useMap(refProp, [55.73, 37.75]);

  return (
    <div className="coordField">
      <Input map={map} setMap={setMap} />
      <CoordsList coord={map} setMap={setMap} />
    </div>
  );
};
