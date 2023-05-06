import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ACTION_TYPE } from "../constants/constant";
import styled from "styled-components";

const Drag = styled("div")`
  width: 100%;
`;

const DragItem = styled("div")`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid black;
  margin-bottom: 10px;
`;

const DragButton = styled("div")`
  outline: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const CoordsList = ({ coord, setMap }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    setMap(ACTION_TYPE.drag, result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Drag {...provided.droppableProps} ref={provided.innerRef}>
            {coord.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <DragItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.name}
                    <DragButton
                      onClick={() => {
                        setMap(ACTION_TYPE.delete, item.id);
                      }}
                    >
                      x
                    </DragButton>
                  </DragItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Drag>
        )}
      </Droppable>
    </DragDropContext>
  );
};
