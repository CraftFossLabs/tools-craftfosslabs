import React from 'react';
import Routess from './routes/Routess';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Routess />
        <Toaster />
      </ThemeProvider>
    </>
  );
};

export default App;
