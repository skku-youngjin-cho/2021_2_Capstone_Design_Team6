import React from 'react';
import MemoTemplate from '../components/MemoTemplate';
import FriendList from '../components/FriendList';

function MainPage({ match }) {
    const { id } = match.params;    

    return (
        <div>
            <FriendList />
            <MemoTemplate userId = {id} />
        </div>
    );
}

export default MainPage;