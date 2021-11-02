import React, { useState } from 'react';
import styled from 'styled-components';
import MemoItem from './MemoItem';
import { useMemoState, useMemoDispatch } from './MemoContext';
import { useDrop } from 'react-dnd';
import Column from './CustumArea';

const MemoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;


function MemoList() {
    const memos = useMemoState();
    const dispatch = useMemoDispatch();

/*
    const [{canDrop, isOver}, drop] = useDrop({
        accept: "MEMO",
        drop: () => ({name: 'some name'}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    const moveMemoHandler = (dragIndex, hoverIndex) => {
        const dragItem = memos[dragIndex];

        if (dragItem) {
            dispatch((prevState => {
                const coppiedStateArray = [...prevState];

                const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

                coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

                return coppiedStateArray;
            }))
        }
    }

    const returnMemosForArea = (areaName) => {
        return memos
                .filter((memo) => memo.area === areaName)
                .map((memo, index) => (
                    <MemoItem 
                        key={memo.id}
                        id={memo.id}
                        text = {memo.text}
                        index={index}
                        setMemos={dispatch}
                        moveMemoHandler={moveMemoHandler}
                    /> 
                ))
    }

   
    console.log('option', {canDrop, isOver});
*/
    return (
            <MemoListBlock>
                {memos.map((memo, index) => (
                    <MemoItem
                        key={memo.id}
                        id={memo.id}
                        text={memo.text}
                    />
                ))}
            </MemoListBlock>
  );
}

export default MemoList;
