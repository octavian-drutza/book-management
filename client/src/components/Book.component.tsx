import React, { useState } from 'react';
import { TableCell, TableRow, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Book } from '../api/api';
import { useBooks } from '../api/api';
import { useBookModal } from '../BookModalContext';

interface Props {
    values: Book,
}

const MAX_DESCRIPTION_LENGTH = 20;


const BookComponent: React.FC<Props> = ({ values }) => {
    const { author, title, genre, description, id } = values;
    const [expanded, setExpanded] = useState(false);
    const { deleteBook } = useBooks();
    const { switchToEditingModal, generateNotification, NotificationTypes } = useBookModal();

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <TableRow sx={{ height: 'fit-content' }}>
            <TableCell sx={cellStyle}>
                <Typography>{author}</Typography>
            </TableCell>
            <TableCell sx={cellStyle}>
                <Typography>{title}</Typography>
            </TableCell>
            <TableCell sx={cellStyle}>
                <Typography>{genre}</Typography>
            </TableCell>
            <TableCell sx={descriptionStyle}>
                <Typography onClick={toggleExpand} sx={expanded ? expandedDescriptionStyle : {}}>
                    {description.length > MAX_DESCRIPTION_LENGTH && !expanded
                        ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                        : description}
                </Typography>
            </TableCell>
            <TableCell>
                <IconButton onClick={() => switchToEditingModal(values)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteBook(id, generateNotification, NotificationTypes.DELETE, title)}>
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow >
    );
};

const cellStyle = {
    padding: '4px',
};

const descriptionStyle = {
    maxWidth: '80px',
    padding: '3px'
};

const expandedDescriptionStyle = {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
};

export default BookComponent;