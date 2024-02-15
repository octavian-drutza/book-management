import React from 'react';
import { Backdrop, Modal, Box, Fade } from '@mui/material';
import BookForm from '../components/BookForm.component';
import { useBookModal } from '../BookModalContext';



const BookFormContainer: React.FC = () => {
    const { open, handleCloseModal } = useBookModal();
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleCloseModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box>
                    <BookForm />
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookFormContainer;