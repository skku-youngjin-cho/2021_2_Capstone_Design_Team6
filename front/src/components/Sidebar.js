import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AddIcon from "@material-ui/icons/Add";
import GroupRemove from "@material-ui/icons/Group"

import SidebarOption from "./SidebarOption";
import FriendList from './FriendList';


const Sidebar = () => {
    const username = localStorage.getItem('username');
    const [userList, setUserList] = useState([
        {
            __id: '',
            name: '',
            count: '',
            password: '',
            friends: []
        }
    ]);

    const [friendList, setFriendList] = useState([]);

    const requestOptions = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
        }
    }

    useEffect(() => {
        console.log('useEffect');
        fetch('/userinfo', requestOptions)
            .then(response => response.json())
            .then(json => {
                setUserList(json.userList);
                setfriendList();
            })
    }, []);

    const setfriendList = () => {
        for(let i in userList) {
            if(userList[i].name === username) {
                setFriendList(userList[i].friends);
            }
        }
        return friendList;
    }

    const onLogout = () => {
        localStorage.setItem('username', '');
        window.location.href = '/';
    }

    return(
        <SidebarContainer>
            <button onClick={onLogout}>
                log out
            </button>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>Team1</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        User1
                    </h3>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeader>

            <SidebarOption Icon={PeopleAltIcon} title="FriendList" />
            {friendList.map(list => (
                <SidebarOption
                    title={list}
                />
            ))
            }
            <SidebarOption Icon={AddIcon} addFriendOption title="Add Friend" />
            <SidebarOption Icon={AddIcon} addFriendOption={false} deleteFriendOption title="Remove Friend" />
            <hr />


        </SidebarContainer>
    );
}

export default Sidebar;

const SidebarContainer = styled.div`
    color: black;
    background-color: #61DAFB;
    flex: 0.3;
    border-top: 1px solid black;
    max-width: 260px;
    margin-top: 60px;
    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid black;
    }
`;

const SidebarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid black;
    padding: 20px
    
    > .MuiSvgIcon-root {
        padding: 10px;
        color: #61DAFB;
        font-size: 18px;
        background-color: black;
        border-radius: 999px;
    }
`;

const SidebarInfo = styled.div`
    flex: 0.9;
    padding: 0 10px;
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }
    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }
    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`;