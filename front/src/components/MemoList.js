import React, {useState} from 'react';
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
    
    const [state, setState] = useState(props.userMemolist);

    //const state = props.userMemolist;

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
                                                                    style={{
                                                                        transitionDuration: `0.001s`
                                                                    }}
                                                                >
                                                                <MemoItem
                                                                    userId={props.userId}
                                                                    areaId={areaId}
                                                                    id={item._id}
                                                                    text={item.memo}
                                                                    memoList={state}
                                                                    setMemoList={setState}
                                                                    test={props.test}
                                                                    setTest={props.setTest}
                                                                    x={item.x}
                                                                    y={item.y}
                                                                    width={item.width}
                                                                    height={item.height}
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
