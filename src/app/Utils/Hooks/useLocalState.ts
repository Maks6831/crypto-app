import { useState } from "react";

export const useLocalState = (key : string, initialValue:any) => {
    const storedValue = typeof window !== 'undefined' ? window.localStorage.getItem(key): null;
    const item = storedValue ? JSON.parse(storedValue) : initialValue;
    const [state, setState] = useState(item);
  
    const updateState = (value:any) => {
      window.localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    };
  
    return [state, updateState];
  
  }
  