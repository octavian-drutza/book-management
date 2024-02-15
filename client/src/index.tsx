import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { BookModalProvider } from './BookModalContext';
import App from './App';
import theme from './theme';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BookModalProvider>
      <App />
    </BookModalProvider>
  </ThemeProvider>
);

