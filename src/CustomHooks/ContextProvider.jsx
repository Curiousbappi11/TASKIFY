import React, { useContext, useState } from 'react'
import { createContext } from "react";

const StateContext = createContext();

function ContextProvider({children}) {
  const [isMenuToggle, setIsMenuToggle] = useState(false);

  function handleMenuToggle() {
    setIsMenuToggle(!isMenuToggle);
  }

  return (
    <StateContext.Provider value={{isMenuToggle, setIsMenuToggle, handleMenuToggle}}>
      {children}
    </StateContext.Provider>
  )
}

export default ContextProvider

export function useStore() {
  return useContext(StateContext);
}