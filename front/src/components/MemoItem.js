import React, {useRef} from 'react';
import styled from 'styled-components';
import * as MdIcons from 'react-icons/md';
import { useMemoDispatch } from './MemoContext';
import { useDrag, useDrop } from 'react-dnd';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;
    &:hover {
    color: #ff6b6b;
    }
    display: none;
`;


const MemoItemBlock = styled.div`
display: block;
list-style: none;
z-index: 1;
float: left;
margin: 30px;
padding: 10px 10px 30px 10px;
width: 180px;
height: 180px;
border: 1px solid #bfbfbf;
background-color:  LightGoldenRodYellow; 
z-index: 2;
color: black;
text-decoration: none;
-webkit-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
-moz-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
-o-box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
-webkit-transition: all 0.5s ease-in;
-moz-transition: all 0.5s ease-in;
-o-transition: all 0.5s ease-in;
-ms-transition: all 0.5s ease-in;
transition: all 0.5s ease-in;
overflow: hidden;
&:hover {
    ${Remove} {
    display: initial;
    }
}
`;

const Text = styled.div`
    flex: 1;
    font-size: 15px;
    color: #495057;

`;



function MemoItem({ id, text, index, setMemos, moveMemoHandler}) {
    const dispatch = useMemoDispatch();
    const onRemove = () => dispatch({ type: 'REMOVE', id});

    const ref = useRef(null);

    const [, drop] = useDrop({accept: "MEMO"});

    const changeMemoArea = (currentItem, areaName, e) => {
        
    }

    
    const [{ isDragging }, drag] = useDrag({
        type: "MEMO", index,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult && dropResult.name === 'Area 1'){
                console.log(dropResult.type);
                changeMemoArea(item, 'Area 1');
            }else {
                console.log(dropResult.type);
                changeMemoArea(item, 'Area 2');
            } 
            //else if 전송 창에 올려놓으면
        },
        
    })

    const opacity = isDragging ? 0.4 : 1;

    drag(drop(ref));

    return (
        <MemoItemBlock ref={ref} style={{opacity}}>
        <Text >{text}</Text>
        <Remove onClick={onRemove}>
            <MdIcons.MdDelete />
        </Remove>
        </MemoItemBlock>
    );
}

export default MemoItem;