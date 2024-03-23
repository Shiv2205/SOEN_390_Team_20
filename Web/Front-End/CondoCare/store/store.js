import { useState, useEffect } from "react";

let appState = {};
let listeners = [];

const addToStore = (data)  => {
  appState = {...appState, ...data};

  for(const listener of listeners) listener(appState);
}

export const useStore = () => {
    const [store, setStore] = useState(appState);

    useEffect(() => {
      listeners.push(setStore);
      setStore();
    
      return () => {
        listeners = listeners.filter(listener => listener !== setStore);
      }
    }, []);
    
    return [appState, addToStore];
}

/**
 * const initialState = appState;

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.payload };
    default:
      throw new Error(
        `Unhandled action type: ${action.type}`
  }
}

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const listener = (newState) => {
      dispatch({ type: 'UPDATE', payload: newState });
    }
    listeners.push(listener);
    listener(appState);

    return () =>(
      listeners = listeners.filter(l => l !== listener);
    }
  }, [appState));

  const addToStore = (newState) => {
    dispatch({ type: 'UPDATE', payload: newState });
  }

  return [state, addToStore]
}
 */