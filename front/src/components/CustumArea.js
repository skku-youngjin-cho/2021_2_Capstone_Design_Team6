import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';


const ColumnBlock = styled.div`
    height: 800px;
    width: 500px;
    margin: 20px;
    border-radius: 10px;
    box-shadow: 1px 1px 6px rgba(0,0,0,0.5);
    display: flex;
    flex-wrap: wrap;
    background-color: #f5ffea;
`;


function Column ({children, className, title}){

    const [, drop] = useDrop({
        accept: 'MEMO',
        drop: () => ({name: title}),
        
    });

    return (
        <ColumnBlock ref={drop} className={className}>
            {title}
            {children}
        </ColumnBlock>
    );
}


export default Column;