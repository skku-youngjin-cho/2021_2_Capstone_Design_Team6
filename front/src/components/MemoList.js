import React from 'react';
import styled from 'styled-components';
import MemoItem from './MemoItem';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const MemoListBlock = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
`;


function MemoList( props ) {


    const state = props.userMemolist;

    return (
        
        <MemoListBlock>
            {Object.entries(state).map(([areaId, area], index) => {
                return(
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                        key={areaId}
                    >
                        <h2>{areaId}</h2>
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
                                            {Object.values(area).map((item, index) => {
                                                return (
                                                    <Draggable
                                                        key={item._id}
                                                        draggableId={item._id.toString()}
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
                                                                    id={item._id}
                                                                    text={item.memo}
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
