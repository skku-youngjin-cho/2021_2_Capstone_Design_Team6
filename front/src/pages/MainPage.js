import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import MemoTemplate from '../components/MemoTemplate';
import FriendList from '../components/FriendList';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

function MainPage({ match }) {
    const username = localStorage.getItem('username');

    // Sidebar 밑에 <MemoTemplate userId = {id} />
    return (
        <div>
            <MainBody>
                <Header />
                <Sidebar />
                <MemoTemplate userId={username} />
                <Chat />
            </MainBody>
        </div>
    );
}

export default MainPage;

const MainBody = styled.div`
    display: flex;
    height: 100vh;
`;