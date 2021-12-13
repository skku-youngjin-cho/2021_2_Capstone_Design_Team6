import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import io from 'socket.io-client';

import Button from '@material-ui/core/Button';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutline';

import { selectRoomId } from "./appSlice";

const socket = io();

const Chat = () => {
    const chatRef = useRef(null);
    const username = localStorage.getItem('username');
    const roomId = useSelector(selectRoomId);

    const [roomDetails] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('room', roomId);
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    },[]);

    const messageFunction = (message) => {
        messages.push(message);
    }

    const handleChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmitPress = (e) => {
        if(e.key === 'Enter') {
            const messageState = {
                name: username,
                body: message
            }
            socket.emit('send message', messageState);
            messageFunction(message);
            setMessage('');
        }
    }



    return (
        <ChatContainer>
            <Header>
                <HeaderLeft>
                    <h4>
                        <strong>#Room name</strong>
                    </h4>
                    <StarBorderOutlinedIcon />
                </HeaderLeft>

                <HeaderRight>
                    <p>
                        <InfoOutlinedIcon /> Details
                    </p>
                </HeaderRight>
            </Header>

            {messages.map(list => (
                <ChatMessages
                    id={username}
                    message={list}
                    roomId={roomId}
                />
            ))}

            <ChatInputContainer>
                <input 
                    placeholder={`Message #Room`}
                    value={message}
                    onChange={handleChangeMessage}
                    onKeyPress={handleSubmitPress}
                />
                <Button 
                    //의미x 임시
                >
                    SEND
                </Button>
            </ChatInputContainer>
        </ChatContainer>
    )
}

export default Chat;

const ChatContainer = styled.div`
    flex: 0.5;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }
    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
    padding-bottom: 200px; 
`;

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
`;

const MessageInfo = styled.div`
    padding-left = 10px;
    
    > h4 > span {
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font_size: 10px;
    }
`;

const ChatInputContainer = styled.div`
    border-radius: 20px;
    > form {
        position: relative:
        display: flex;
        justify-content: center;
    }
    > form > input {
        position: fixed;
        bottom: 30px;
        width: 50%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 30px;
        outline: none;
    }
`;