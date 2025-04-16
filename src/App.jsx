import React from 'react';
import Routess from './routes/Routess';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'sonner';
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
