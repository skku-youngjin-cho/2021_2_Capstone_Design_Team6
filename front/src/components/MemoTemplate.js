import React, {useState, useEffect} from 'react';
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


function MemoTemplate({userId}) {

    const [area, setArea] = useState(null);

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
    }, []);

    if(!area){
        return null;
    }

    return (
        <DragDropContext
            onDragEnd={result => onDragEnd(result, userId, area, setArea)}
        >
            <MemoList userId={userId} userMemolist={area}/>
            <MemoCreate userId={userId} userMemolist={area}/>

        </DragDropContext>
            
    )
}

export default React.memo(MemoTemplate)
