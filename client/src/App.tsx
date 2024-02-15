import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useBookModal } from './BookModalContext';
import BookFormContainer from './containers/BookForm.container';
import BookContainer from './containers/Book.container';
import NotificationComponent from './components/Notification.component';

function App() {
  const { handleOpenModal } = useBookModal();

  return (
    <Box sx={mainStyles}>
      <NotificationComponent />
      <BookContainer />
      <Box sx={addBtnStyles}>
        <Typography variant='h1' color='primary' sx={{ padding: '15px', textAlign: 'center', textAlignLast: 'center' }}> Personal Library Manager</Typography>
        <Button type="button" variant="contained" color="primary" onClick={handleOpenModal}>I want to add a new Book</Button>
      </Box>
      <BookFormContainer />
    </Box>
  );
}

const mainStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
};

const addBtnStyles = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
};



export default App;
