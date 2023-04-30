import { createContext, useContext, useState } from "react";

export const ContextData = createContext();

export const DataProvide = ({ children }) => {
  const [transactionList, setList] = useState([]);

  return (
    <ContextData.Provider value={[transactionList, setList]}>
      {children}
    </ContextData.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(ContextData);
};
