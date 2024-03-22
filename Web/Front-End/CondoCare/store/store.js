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