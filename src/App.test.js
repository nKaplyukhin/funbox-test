import { act, render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { CoordsList } from "./CoordField/CoordsList";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("delete item button work", () => {
  const coord = [
    {
      placemark: {},
      coord: [10, 10],
      id: "id1",
      name: "testName",
    },
  ];

  const setMap = jest.fn();

  act(() => {
    render(<CoordsList coord={coord} setMap={setMap} />, container);
  });

  const button = document.querySelector(".drag__button");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const items = document.querySelectorAll(".drag__item");

  expect(setMap).toHaveBeenCalledTimes(1);
  expect(items.length).toEqual(1);
});

it("render coordList", () => {
  const coord = [
    {
      placemark: {},
      coord: [10, 10],
      id: "id1",
      name: "testName",
    },
    {
      placemark: {},
      coord: [11, 11],
      id: "id2",
      name: "testName2",
    },
  ];

  const setMap = jest.fn();

  act(() => {
    render(<CoordsList coord={coord} setMap={setMap} />, container);
  });

  const items = document.querySelectorAll(".drag__item");

  expect(items.length).toEqual(2);
});
