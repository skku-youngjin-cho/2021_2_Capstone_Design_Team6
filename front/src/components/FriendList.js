import React from 'react'
import styled from 'styled-components';

import SidebarOption from './SidebarOption';

const FriendList = (friendList) => {


    return(
        <FriendListContainer>
            {friendList.map(list => (
                <SidebarOption
                    title={list}
                />
            ))
            }
        </FriendListContainer>
    )
}

export default FriendList;

const FriendListContainer = styled.div``;