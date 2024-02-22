import React from 'react';
import { Box, Snackbar } from '@mui/material';
import { useBookModal } from '../BookModalContext';

const vertical = 'top';
const horizontal = 'center';

const NotificationComponent: React.FC = () => {
    const { notification, handleCloseNotification } = useBookModal();

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={!!notification}
                autoHideDuration={5000}
                onClose={handleCloseNotification}
                message={notification}
                key={vertical + horizontal}
            />
        </Box>
    );
};

export default NotificationComponent;

