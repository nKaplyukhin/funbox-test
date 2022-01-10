import { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { coordContext } from "../../context/coordContext";
import "./CoordsList.css";

export const CoordsList = () => {
  const { coord, dragCoord, deleteCoord } = useContext(coordContext);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    dragCoord(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            className="dragList"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {coord.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="dragItem"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.name}
                    <button
                      className="close"
                      onClick={() => {
                        deleteCoord(item.id);
                      }}
                    >
                      x
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
