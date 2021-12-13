import React from 'react';
import styled from 'styled-components';
import MemoTemplate from '../components/MemoTemplate';
import FriendList from '../components/FriendList';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

function MainPage({ match }) {
    const id = 'user1';

    // Sidebar 밑에 <MemoTemplate userId = {id} />
    return (
        <div>
            <MainBody>
                <Header />
                <Sidebar />
                <MemoTemplate userId={id} />
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