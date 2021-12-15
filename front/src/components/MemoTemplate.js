import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import MemoList from './MemoList';
import MemoCreate from './MemoCreate';
import * as usersAPI from '../api/users'; 


const onDragEnd = (result, userId, areas, setAreas) => {
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (destination.droppableId === "Droppable") {
        console.log("send");
        //전송
    }
  };


function MemoTemplate(props) {

    const [area, setArea] = useState(null);

    const [test, setTest] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            setArea(null);
            const data = await usersAPI.getMemoByUid(props.userId);
            const area = {
                ...data,
                "Droppable": {
                }
            };
            setArea(area);
            console.log(area);
        };
        fetchUsers();
    }, [test]);

    if(!area){
        return null;
    }

    return (
        <DragDropContext
            onDragEnd={result => onDragEnd(result, props.userId, area, setArea)}
        >
            <MemoList userId={props.userId} userMemolist={area} test={test} setTest={setTest} />

            <MemoCreate userId={props.userId} userMemolist={area} test={test} setTest={setTest}/>

        </DragDropContext>
            
    )
}

export default React.memo(MemoTemplate)
