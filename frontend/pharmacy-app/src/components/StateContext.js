import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export function StateProvider({ children }) {
  const [state, setState] = useState({
    role: '',
    pharmacy: ''
  });
  
  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
