import React from 'react';
import styled from 'styled-components';
import MemoItem from './MemoItem';
import { useAreaState, useUserState, useUserId} from './MemoContext';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const MemoListBlock = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
`;


function MemoList() {
/*
    const userId = useUserId();
    const userState = useAreaState();

    const user = Object.values(userState).filter(user => user.id === userId.current);

    const memo = user[0].memolist;
*/
    const area = useAreaState();

    return (
        
        <MemoListBlock>
            {Object.entries(area).map(([areaId, area], index) => {
                return(
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                        key={areaId}
                    >
                        <h2>{area.name}</h2>
                        <div style={{ margin: 8}}>
                            <Droppable droppableId={areaId} key={areaId}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                            background: snapshot.isDraggingOver
                                                ? "lightblue"
                                                : "lightgrey",
                                            padding: 4,
                                            width: 250,
                                            minHeight: 500
                                            }}
                                        >
                                            {area.items.map((item, index) => {
                                                return (
                                                    <Draggable
                                                        key={item.id}
                                                        draggableId={item.id}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => {
                                                
                                                            return(
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                <MemoItem
                                                                    areaId={areaId}
                                                                    id={item.id}
                                                                    text={item.text}
                                                                >
                                                                </MemoItem>
                                                                </div>
                                                            );
                                                        }}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    );
                                }}
                            </Droppable>
                        </div>
                    </div>
                );
            })}
        </MemoListBlock>
  );
}

export default MemoList;
