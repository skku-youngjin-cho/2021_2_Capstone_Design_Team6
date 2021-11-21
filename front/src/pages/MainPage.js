import React from 'react';
import styled from 'styled-components';
import MemoTemplate from '../components/MemoTemplate';
import FriendList from '../components/FriendList';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function MainPage({ match }) {
    const { id } = match.params;

    return (
        <div>
            <MainBody>
                <Header />
                <Sidebar />
                <MemoTemplate userId = {id} />
            </MainBody>
        </div>
    );
}

export default MainPage;

const MainBody = styled.div`
    display: flex;
    height: 100vh;
`;