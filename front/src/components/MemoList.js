import React from 'react';
import styled from 'styled-components';
import MemoItem from './MemoItem';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import * as RiIcons from "react-icons/ri";

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
                            flexDirection: "column",
                            width: "auto",
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
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
                                                padding: 4,
                                                display: "flex",
                                                width: "auto"
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

<Droppable droppableId="Droppable" key="Droppable">
            {(provided, snapshot) => {
                                    return (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            style={{
                                                background: "#5483b1",
                                                zIndex: 5,
                                                width: snapshot.isDraggingOver
                                                    ? 80
                                                    : 30,
                                                height: snapshot.isDraggingOver
                                                    ? 80
                                                    : 30,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: 15,
                                                position: "fixed",
                                                left: "80%",
                                                bottom: 40,
                                                transform: "translate(-50%, 50%)",
                                                color: "white",
                                                borderRadius: "50%",
                                                border: "none",
                                                outline: "none",
                                                transition: "0.125s all ease-in"
                                            }}
                                        >
                                            <RiIcons.RiMailSendFill />
                                            {provided.placeholder}
                                        </div>
                                        
                                    );
                }}
            </Droppable>
        </MemoListBlock>
  );
}

export default MemoList;
