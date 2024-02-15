import React, { useEffect, useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import { useBookModal } from '../BookModalContext';

const NotificationComponent: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { notification } = useBookModal();

    const vertical = 'top';
    const horizontal = 'center';

    useEffect(() => {
        if (notification) {
            setOpen(true);
        }
    }, [notification]);

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={notification}
                key={vertical + horizontal}
            />
        </Box>
    );
};

export default NotificationComponent;