import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ACTION_TYPE } from "../../constants/constant";
import "./CoordsList.css";

export const CoordsList = ({ coord, setMap }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    setMap(ACTION_TYPE.drag, result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            className="drag"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {coord.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    className="drag__item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.name}
                    <button
                      className="drag__button"
                      onClick={() => {
                        setMap(ACTION_TYPE.delete, item.id);
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
