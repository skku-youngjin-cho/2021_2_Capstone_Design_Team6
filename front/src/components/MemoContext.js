import React, { useReducer, createContext, useContext, useRef, useState } from 'react';
import uuid from "uuidv4";

const initialMemos = [
    {
        id: "1",
        text: '메모1'
    },
    {
        id: "2",
        text: '메모2'
    },
    {
        id: "3",
        text: '메모3'
    },
];

const areaFromBackend ={
    "Default": {
        name: "Default",
        items: initialMemos
    },
    "Droppable": {
        name: "Droppable",
        items: []
    }
}

const userFromBackend = [
    {
        id: "1",
        name: "user1",
        memolist: areaFromBackend
    },
    {
        id: "2",
        name: "user2",
        memolist: {
            "Default": {
                name: "Default",
                items: []
            },
            "Droppable": {
                name: "Droppable",
                items: []
            }
        }
    },
];


const MemoNextIdContext = createContext();

const AreaStateContext = createContext();
const AreaSetContext = createContext();

//const SetCurrentUser = createContext();
const SetUserId= createContext();

const UserStateContext = createContext();
const UserSetContext = createContext();

export function MemoProvider({ children }) {
    const currentUserId = useRef("1");
    //const currentUser = userFromBackend.filter(user => user.id === currentUserId.current);
    const [user, setUser] = useState(userFromBackend);

    const [area, setArea] = useState(areaFromBackend);

    const nextId = useRef(4);

    return (
        <SetUserId.Provider value={currentUserId}>
            <UserStateContext.Provider value={user}>
                <UserSetContext.Provider value={setUser}>
                    <MemoNextIdContext.Provider value={nextId}>
                        <AreaStateContext.Provider value={area}>
                            <AreaSetContext.Provider value={setArea}>
                                {children}
                            </AreaSetContext.Provider>
                        </AreaStateContext.Provider>
                    </MemoNextIdContext.Provider>
                </UserSetContext.Provider>
            </UserStateContext.Provider>
        </SetUserId.Provider>
    );
}

export function useUserId() {
    const context = useContext(SetUserId);
    if (!context) {
        throw new Error('Cannot find MemoProvider');
    }
    return context;
}
/*
export function useUserState() {
    const context = useContext(SetCurrentUser);
    if (!context) {
        throw new Error('Cannot find MemoProvider');
    }
    return context;
}
*/

export function useUserState() {
    const context = useContext(UserStateContext);
    if (!context) {
        throw new Error('Cannot find MemoProvider');
    }
    return context;
}

export function useSetUser() {
    const context = useContext(UserSetContext);
    if (!context) {
        throw new Error('Cannot find MemoProvider');
    }
    return context;
}


export function useMemoNextId() {
    const context = useContext(MemoNextIdContext);
    if (!context) {
        throw new Error('Cannot find MemoProvider');
    }
    return context;
}

export function useAreaState() {
    const context = useContext(AreaStateContext);
    if (!context) {
        throw new Error('Cannot find MemoProvider');
    }
    return context;
}

export function useAreaSet() {
    const context = useContext(AreaSetContext);
    if (!context) {
        throw new Error('Cannot find MemoProvider');
    }
    return context;
}