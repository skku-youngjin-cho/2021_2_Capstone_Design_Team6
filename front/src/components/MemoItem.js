import React from 'react';
import styled from 'styled-components';
import * as MdIcons from 'react-icons/md';

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
z-index: 2;
float: left;
margin: 10px;
padding: 10px 10px 30px 10px;
width: 100px;
height: 100px;
border: 1px solid #bfbfbf;
background-color:  LightGoldenRodYellow; 
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



function MemoItem({ areaId, id, text, index}) {

    //const area = useAreaState();
    //const setArea = useAreaSet();

    const onRemove = () => {/*
        const sourceArea = area[areaId];
        const sourceItems = [...sourceArea.items];
        const remove = sourceItems.filter(memo => memo.id !== id);

        setArea({
            ...area,
            [areaId] : {
                ...sourceArea,
                items : remove
            }
        })
*/
    }

    return (
        <MemoItemBlock>
        <Text >{text}</Text>
        <Remove onClick={onRemove}>
            <MdIcons.MdDelete />
        </Remove>
        </MemoItemBlock>
    );
}

export default MemoItem;