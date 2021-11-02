import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialMemos = [
  {
    id: 1,
    text: '메모1',
    area: 'Area 1'
  },
  {
    id: 2,
    text: '메모2',
    area: 'Area 1'
  },
  {
    id: 3,
    text: '메모3',
    area: 'Area 1'
  },
];

function MemoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.memo);
    case 'REMOVE':
      return state.filter(memo => memo.id !== action.id);
    case 'MOVE' :
      return state;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const MemoStateContext = createContext();
const MemoDispatchContext = createContext();
const MemoNextIdContext = createContext();


export function MemoProvider({ children }) {
  const [state, dispatch] = useReducer(MemoReducer, initialMemos);
  const nextId = useRef(4);

  return (
      <MemoStateContext.Provider value={state}>
          <MemoDispatchContext.Provider value={dispatch}>
              <MemoNextIdContext.Provider value={nextId}>
                  {children}
              </MemoNextIdContext.Provider>
          </MemoDispatchContext.Provider>
      </MemoStateContext.Provider>
  );
}

export function useMemoState() {
    const context = useContext(MemoStateContext);
    if (!context) {
        throw new Error('Cannot find MemoProvider');
    }
    return context;
}
  
export function useMemoDispatch() {
    const context = useContext(MemoDispatchContext);
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