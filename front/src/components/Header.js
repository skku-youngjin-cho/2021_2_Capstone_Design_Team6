import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core"
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const Header = () => {
    return(
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar
                //onClick 추가가능
                />
                <AccessTimeIcon
                //onClick 추가가능
                />
            </HeaderLeft>

            <HeaderCenter>
                <SearchIcon />
                <input placeholder="No signal" />
            </HeaderCenter>

            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>

        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding 10px 0;
    background-color: #61DAFB;
    color: black;
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;
    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`;

const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

const HeaderCenter = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    background-color: #bff0fd;
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: gray;
    border: 1px gray solid;
    > input {
        background-color: transparent;
        border: none;
        text-align: left;
        min-width: 30vw;
        outline: 0;
        color: black;
    }
`;

const HeaderRight = styled.div`
    flex: 0.3;
    opacity: 1;
    padding: 0 20px;
    text-align: right;
`;