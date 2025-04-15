import React, { createContext, useState, useContext } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [isProgressVisible, setProgressVisible] = useState(false);

  const showProgress = () => setProgressVisible(true);
  const hideProgress = () => setProgressVisible(false);

  return (
    <ProgressContext.Provider value={{ isProgressVisible, showProgress, hideProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
