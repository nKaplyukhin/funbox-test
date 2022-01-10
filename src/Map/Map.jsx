import { useContext, useEffect, useRef } from "react";
import { coordContext } from "../context/coordContext";
import "./Map.css";

export const Map = () => {
  const { initializeMap } = useContext(coordContext);

  const ref = useRef();

  //инициализация карты
  useEffect(() => {
    initializeMap(ref);
    // eslint-disable-next-line
  }, []);

  return <div className="map" ref={ref}></div>;
};
