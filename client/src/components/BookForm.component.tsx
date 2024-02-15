import React from 'react';
import { Container, Grid, Button, InputLabel, Alert } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import type { Book } from '../api/api';
import { useBooks } from '../api/api';
import { useBookModal } from '../BookModalContext';



const BookForm: React.FC = () => {
    const { addBook, updateBook } = useBooks();
    const { initialValues, handleCloseModal, isEditing, generateNotification, NotificationTypes } = useBookModal();
    const ErrorMessage = (touched: boolean, error: string) => {
        return touched && !!error ? (
            <Alert severity='error' style={alertStyle}>{error}</Alert>
        ) : null;
    };
    return (
        <Container maxWidth="sm" sx={componentStyle}>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    author: Yup.string()
                        .required('Author Name is Required'),
                    title: Yup.string()
                        .required('Book Title is Required'),
                    genre: Yup.string()
                        .required('Book Genre is Required'),
                    description: Yup.string()
                        .required('Description is Required'),
                })}
                onSubmit={(values: Book, { setSubmitting }) => {
                    isEditing ? updateBook({ ...values, id: initialValues.id }, generateNotification, NotificationTypes.UPDATE) :
                        addBook(values, generateNotification, NotificationTypes.ADD);
                    setSubmitting(false);
                    handleCloseModal();
                }}
            >
                {formik => (
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="author">Author</InputLabel>
                                <Field
                                    id="author"
                                    name="author"
                                    variant="outlined"
                                    style={fieldStyle}
                                />
                                {ErrorMessage(formik.touched.author, formik.errors.author)}
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="title">Title</InputLabel>
                                <Field
                                    id="title"
                                    name="title"
                                    variant="outlined"
                                    style={fieldStyle}
                                />
                                {ErrorMessage(formik.touched.title, formik.errors.title)}
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="genre">Genre</InputLabel>
                                <Field
                                    id="genre"
                                    name="genre"
                                    variant="outlined"
                                    style={fieldStyle}
                                />
                                {ErrorMessage(formik.touched.genre, formik.errors.genre)}
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="description">Description</InputLabel>
                                <Field
                                    as={TextareaAutosize}
                                    minRows={5}
                                    placeholder="Leave a short description of the book here..."
                                    id="description"
                                    name="description"
                                    style={fieldStyle}
                                />
                                {ErrorMessage(formik.touched.description, formik.errors.description)}
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button type="submit" variant="contained" color="primary" >{isEditing ? 'Save Changes' : 'Add Book'}</Button>
                                <Button type="button" variant="contained" color="error" onClick={handleCloseModal} >Cancel</Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Container >

    );
};

const componentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    maxWidth: 400,
};

const fieldStyle = {
    width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px'
};

const alertStyle = {
    width: '100%', paddingLeft: '10px', paddingRight: '10px', paddingBottom: '0px', paddingTop: '0px', fontSize: '0.75rem'
};

export default BookForm;