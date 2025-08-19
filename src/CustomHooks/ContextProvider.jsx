import React, { useContext, useState } from 'react'
import { createContext } from "react";

const StateContext = createContext();

function ContextProvider({children}) {

  const [isMenuToggle, setIsMenuToggle] = useState(false);
  const [isCheckboxToggle, setIsCheckboxToggle] = useState(false);

  function handleMenuToggle() {
    setIsMenuToggle(!isMenuToggle);
  }

  function handleCheckboxToggle(e) {
    setIsCheckboxToggle(!isCheckboxToggle);
  }

  return (
    <StateContext.Provider value={{isMenuToggle, setIsMenuToggle, handleMenuToggle, isCheckboxToggle, handleCheckboxToggle}}>
      {children}
    </StateContext.Provider>
  )
}

export default ContextProvider

export function useStore() {
  return useContext(StateContext);
}