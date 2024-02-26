import { useState } from "react";

export const useLocalState = (key : string, initialValue:any) => {
    const storedValue = window.localStorage.getItem(key);
    const item = storedValue ? JSON.parse(storedValue) : initialValue;
    const [state, setState] = useState(item);
  
    const updateState = (value:any) => {
      window.localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    };
  
    return [state, updateState];
  
  }
  