import React, { useContext, createContext, useState } from "react";

export const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

const LoadingContextProvider = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isPageLoading, setIsPageLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
