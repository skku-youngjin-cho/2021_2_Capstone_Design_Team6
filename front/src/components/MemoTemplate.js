import React, {useState, useEffect} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
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


function MemoTemplate({userId}) {

    const [area, setArea] = useState(null);

    const [test, setTest] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            setArea(null);
            const data = await usersAPI.getMemoByUid(userId);
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
        <MemoContainer>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, userId, area, setArea)}
            >
                <MemoList userId={userId} userMemolist={area} test={test} setTest={setTest}/>

                <MemoCreate userId={userId} userMemolist={area} test={test} setTest={setTest}/>

            </DragDropContext>
        </MemoContainer>
            
    )
}

export default React.memo(MemoTemplate)

const MemoContainer = styled.div`
    flex: 0.5;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`;