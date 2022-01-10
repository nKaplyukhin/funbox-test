import React, { createContext, useEffect, useState } from "react";
import nextId from "react-id-generator";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const coordContext = createContext([]);

export const CoordContextProvider = ({ children }) => {
  //массив хранит данные о точках, координаты точек и т.д.
  const [coord, setCoord] = useState([]);
  const [polyline, setPolyline] = useState(null);

  //Инициализация какрты (запускается единожды в useEffect)
  const initializeMap = (ref) => {
    const ymaps = window.ymaps;
    ymaps.ready(() => {
      const ymaps = window.ymaps;
      let myMap = new ymaps.Map(
        ref.current,
        {
          center: [55.73, 37.75],
          zoom: 9,
        },
        {
          searchControlProvider: "yandex#search",
        }
      );

      window.myMap = myMap;
    });
  };

  //меняет местами элементы в массиве при изменении их расположения
  const dragCoord = (result) => {
    const items = reorder(coord, result.source.index, result.destination.index);
    setCoord(items);
  };

  //Добавляе новую точку на карту и в массив
  const addNewCoord = (name) => {
    const ymaps = window.ymaps;

    let myGeoObject = new ymaps.Placemark(
      window.myMap.getCenter(),
      {
        id: nextId(),
        balloonContent: name,
      },
      {
        preset: "islands#icon",
        iconColor: "#0095b6",
        draggable: true,
      }
    );

    const placemark = {
      placemark: myGeoObject,
      coord: myGeoObject.geometry._coordinates,
      id: myGeoObject.properties.get("id"),
      name: name,
    };

    window.myMap.geoObjects.add(myGeoObject);

    setCoord([...coord, placemark]);
  };

  //Удаление метки из массива и с карты
  const deleteCoord = (id) => {
    const items = coord.filter((item) => {
      if (item.id === id) {
        window.myMap.geoObjects.remove(item.placemark);
        return false;
      } else {
        return true;
      }
    });

    setCoord(items);
  };

  //При каждой перерисовке, если в этом есть необходимость, будет перерисована polyline
  useEffect(() => {
    if (polyline) window.myMap.geoObjects.remove(polyline);
    if (coord.length > 1) {
      const ymaps = window.ymaps;
      const polyCoord = [...coord].map((item) => item.coord);

      var myPolyline = new ymaps.Polyline(
        polyCoord,
        {},
        {
          balloonCloseButton: false,
          strokeColor: "#000000",
          strokeWidth: 2,
          strokeOpacity: 1,
        }
      );

      window.myMap.geoObjects.add(myPolyline);
      setPolyline(myPolyline);
    }

    // eslint-disable-next-line
  }, [coord]);

  useEffect(() => {
    const updateCoord = (e) => {
      const target = e.get("target");
      const id = target.properties.get("id");

      const newItems = coord.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            placemark: target,
            coord: target.geometry._coordinates,
          };
        } else return item;
      });
      setCoord(newItems);
    };

    //При изменении данных о точках удаляем и назначаем по новой событие перетаскивания, чтобы данные внутри обновились
    coord.forEach((item) => {
      item.placemark.events.add("dragend", updateCoord);
    });

    return () => {
      coord.forEach((item) => {
        item.placemark.events.remove("dragend", updateCoord);
      });
    };
  }, [coord]);

  return (
    <coordContext.Provider
      value={{
        coord,
        deleteCoord,
        addNewCoord,
        dragCoord,
        initializeMap,
      }}
    >
      {children}
    </coordContext.Provider>
  );
};
