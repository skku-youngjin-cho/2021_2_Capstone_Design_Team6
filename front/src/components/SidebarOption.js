import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { enterRoom } from "./appSlice";
import swal from 'sweetalert';

const SidebarOption = ({Icon, title, addFriendOption, deleteFriendOption, id}) => {
    const dispatch = useDispatch();
    const username = localStorage.getItem('username');

    const addFriend = () => {
        const friendName = prompt("Please enter your friend name to add");

        const data = {
            from: username,
            to: friendName
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        fetch('/addFriend', requestOptions)
        .then(response => response.json())
        .then(json => {
            swal("Success", json['msg'], "success", {
                buttons: false,
                timer: 2000,
            })
        })
        .catch(error => {
            swal("Failed", error['msg'], "error");
        })
        setTimeout(function(){
            window.location.replace(`/${username}`);
        }, 2000)
    }

    const deleteFriend = () => {
        const friendName = prompt("Please enter your friend name to delete");

        const data = {
            from: username,
            to: friendName
        }
        const requestOptions = {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        fetch('/deleteFriend', requestOptions)
        .then(response => response.json())
        .then(json => {
            swal("Success", json['msg'], "success", {
                buttons: false,
                timer: 2000,
            })
        })
        .catch(error => {
            swal("Failed", error['msg'], "error");
        })

        setTimeout(function(){
            window.location.replace(`/${username}`);
        }, 2000)
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

    const onMouseMove = () => {
        const target = localStorage.getItem('target');
        if(target === "NULL"){
            localStorage.setItem('target', title)
            //console.log("in & save")
        }
        
    }

    const onMouseOut = () => {
        //console.log("out")
        localStorage.setItem('target', "NULL")
    }


    return(
        <SidebarOptionContainer
            onClick={addFriendOption ? addFriend : (deleteFriendOption ? deleteFriend : selectFriend)}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseOut}
        >
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