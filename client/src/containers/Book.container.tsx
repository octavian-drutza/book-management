import React from 'react';
import { TableContainer, Table, TableBody, TableHead, TableCell, TableRow, Paper, Box, Typography } from '@mui/material';
import { useBooks } from '../api/api';
import BookComponent from '../components/Book.component';


const BookContainer: React.FC = () => {
    const { bookList, isLoading, error } = useBooks();

    if (isLoading) {
        return (
            <Box>
                Loading
            </Box>
        );
    }

    if (bookList.length === 0) {
        return (
            <Box>
                You have no books yet, go ahead and add some!
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                Sorry! Something went wrong.
            </Box>
        );
    }
    return (
        <TableContainer component={Paper} sx={containerStyles}>
            <Table sx={{ minWidth: 320 }}>
                <TableHead  >
                    <TableRow >
                        <TableCell sx={headerStyles}>
                            <Typography variant="h2">Author</Typography>
                        </TableCell>
                        <TableCell sx={headerStyles}>
                            <Typography variant="h2">Title</Typography>
                        </TableCell>
                        <TableCell sx={headerStyles}>
                            <Typography variant="h2">Genre</Typography>
                        </TableCell>
                        <TableCell sx={headerStyles}>
                            <Typography variant="h2">Description</Typography>
                        </TableCell>
                        <TableCell sx={headerStyles}>
                            <Typography variant="h2">Actions</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookList.map((book, index) => (
                        <BookComponent key={index} values={book} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
};

const headerStyles = {
    backgroundColor: '#f0f0f0',
    padding: '4px'
};

const containerStyles = {
    maxWidth: 1000,
    width: '100%',
    margin: '50px'
};

export default BookContainer;