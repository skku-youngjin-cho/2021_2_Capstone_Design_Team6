import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import * as MdIcons from 'react-icons/md';
import { useMemoNextId, useAreaSet, useUserId, useUserState, useSetUser} from './MemoContext';
import uuid from "uuidv4";

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 90%;
  bottom: 40px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: none;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function MemoCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const nextId = useMemoNextId();

    const setArea = useAreaSet();

    const userId = useUserId();
    const userState = useUserState();

    const addMemo = () => {

        
        console.log(userId.current);

        const user = Object.values(userState).filter(user => user.id === userId.current);

        console.log(user);

        console.log(user[0]);

        const memos = user[0].memolist;

        console.log(memos);
        

        setArea(prev => {
            return {
                ...prev,
                Default: {
                    name: "Default",
                    items: [
                        {
                            id: uuid(),
                            text: value
                        },
                        ...prev.Default.items
                    ]
                }
            }
        })
    }

    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        addMemo();
        setValue('');
        setOpen(false);
        nextId.current += 1;
    }

    return (
        <>
        {open && (
            <InsertFormPositioner>
                <InsertForm onSubmit={onSubmit}>
                    <Input 
                        autoFocus 
                        placeholder="입력"
                        onChange={onChange}
                        value={value} 
                    />
                </InsertForm>
            </InsertFormPositioner>
        )}
        <CircleButton onClick={onToggle} open={open}>
            <MdIcons.MdAdd />
        </CircleButton>
        </>
  );
}

export default React.memo(MemoCreate);