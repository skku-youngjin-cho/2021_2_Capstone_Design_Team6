import React from 'react';
import { useAreaState, useAreaSet } from './MemoContext';
import { DragDropContext } from 'react-beautiful-dnd';


const onDragEnd = (result, areas, setAreas) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceArea = areas[source.droppableId];
      const destArea = areas[destination.droppableId];
      const sourceItems = [...sourceArea.items];
      const destItems = [...destArea.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setAreas({
        ...areas,
        [source.droppableId]: {
          ...sourceArea,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destArea,
          items: destItems
        }
      });
    } else {
      const area = areas[source.droppableId];
      const copiedItems = [...area.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setAreas({
        ...areas,
        [source.droppableId]: {
          ...areas,
          items: copiedItems
        }
      });
    }
  };

function MemoTemplate({children}) {

    const area = useAreaState();
    const setArea = useAreaSet();

    return (
        <DragDropContext
            onDragEnd={result => onDragEnd(result, area, setArea)}
        >
            {children}

        </DragDropContext>
            
    )
}

export default MemoTemplate
