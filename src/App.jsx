import React, { useEffect } from 'react';
import Routess from './routes/Routess';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'sonner';
import { registerServiceWorkerAndSubscribe } from './lib/serviceWorkerRegistration';
const App = () => {
  useEffect(() => {
    registerServiceWorkerAndSubscribe();
  }, []);
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
