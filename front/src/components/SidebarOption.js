import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { enterRoom } from "./appSlice";

const SidebarOption = ({Icon, title, addFriendOption, id}) => {
    const dispatch = useDispatch();

    const addFriend = () => {
        const friendName = prompt("Please enter your friend name");

        if (friendName) {
            console.log(friendName);
        }
    }

    const selectFriend = () => {
         if (id) {
            dispatch(
                enterRoom({
                    roomId: id,
                })
            );
         }
    }

    return(
        <SidebarOptionContainer
            onClick={addFriendOption ? addFriend : selectFriend}>
            {Icon && <Icon fontSize='small' style={{padding: 10}} />}
            {Icon ? (
                <h3>{title}</h3>
            ): (
                <SidebarOptionChannel >
                    <span>#</span> {title}
                </SidebarOptionChannel>
            )}
        </SidebarOptionContainer>
    )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;
    
    :hover {
        opacity: 0.9;
        background-color: #06C2FB;
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 0;
    font-weight: 300;
`;