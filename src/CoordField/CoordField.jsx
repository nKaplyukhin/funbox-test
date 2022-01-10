import { useContext, useState } from "react";
import { coordContext } from "../context/coordContext";
import { CoordsList } from "./CoordsList";
import "./CoordField.css";

export const CoordField = () => {
  const { addNewCoord, coord } = useContext(coordContext);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  return (
    <div className="coordField">
      <input
        className="coordField__input"
        type="text"
        value={value}
        placeholder="Введите название точки"
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        onKeyPress={(e) => {
          setError(false);
          if (value.length > 0) {
            if (e.code === "Enter") {
              let flag = false;
              coord.forEach((item) => {
                if (item.name === value) {
                  setError(true);
                  flag = true;
                }
              });
              if (!flag) {
                addNewCoord(value);
                setValue("");
              }
            }
          }
        }}
      />
      {error && (
        <div className="coordField__error">данное название используется</div>
      )}
      <CoordsList />
    </div>
  );
};
