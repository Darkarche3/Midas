import React, { createContext, useState } from 'react';

export const PrecisionContext = createContext();

export const PrecisionProvider = ({ children }) => {
  const [amountLocked, setAmountLocked] = useState(0);

  return (
    <PrecisionContext.Provider value={{ amountLocked, setAmountLocked }}>
      {children}
    </PrecisionContext.Provider>
  );
};