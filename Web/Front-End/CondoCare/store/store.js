import { useState, useEffect } from "react";

let appState = {};
let listeners = new Set();

const reducer = (action, setState) => {
  switch (action.type) {
    case "CREATE":
      console.log(action);
      appState = { ...appState, ...action.payload };
      setState(appState);
      break;
    case "DELETE":
      delete appState[action.payload];
      return appState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
  listeners.forEach(listener => listener()); // Notify all the listeners of any state change
};

/**
 * ## Custom React hook that provides access to global app state and dispatch.
 *---
 * - ### Returns an array with the current state and dispatch function:
 *
 * @example 
 * ```js 
 * const [state, dispatch] = useStore();
 * ```
 *---
 * - ### dispatch can be used to update state by passing an action and new state:
 * 
 * @example 
 * ```js
 * dispatch('CREATE', {userData: {...newState}})
 * ```
 *---
 *  ***State is persisted using useState and useEffect hooks. Listeners
 * are notified of changes.***
 */
export const useStore = () => {
  const [state, setState] = useState(appState);
  useEffect(() => {
    const listener = () => {
      setState(appState);
    };
    listeners.add(listener);
    listener(); // in case it's already changed
    return () => listeners.delete(listener); // cleanup
  }, []);

  const dispatch = (action, newState) => {
    reducer({ type: action, payload: { ...newState } }, setState);
  };
  return [state, dispatch];
};
