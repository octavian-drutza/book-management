import axios, { AxiosResponse } from 'axios';
import useSWR, { mutate } from 'swr';

const API_URL = 'http://localhost:3001/books';

export type Book = {
    id?: string;
    title: string;
    author: string;
    genre: string;
    description: string;
};

async function getBooks(url: string): Promise<Book[]> {
    try {
        const response: AxiosResponse = await axios.get(url);
        const books = response.data;
        console.log('Books', books);
        return books;
    }
    catch (err) {
        console.error('Error fetching books', err);
        throw err;
    }
}

async function addBook(book: Book, generateNotification: (title: string, type: string) => void,
    type: string): Promise<void> {
    try {
        const response: AxiosResponse = await axios.post(API_URL, book);
        if (response.status === 201) {
            mutate(API_URL);
            generateNotification(book.title, type);
            console.log('Book added', response.data);
        } else {
            console.log('Failed to add book', response.statusText);
        }
    }
    catch (err) {
        console.error('Error adding book', err);
        throw err;
    }
}

async function updateBook(book: Book, generateNotification: (title: string, type: string) => void,
    type: string): Promise<void> {
    try {
        const response: AxiosResponse = await axios.put(`${API_URL}/${book.id}`, book);
        if (response.status === 200) {
            mutate(API_URL);
            generateNotification(book.title, type);
            console.log('Book updated', response.data);
        } else {
            console.log('Failed to update book', response.statusText);
        }
    }
    catch (err) {
        console.error('Error updating book', err);
        throw err;
    }
}

async function deleteBook(id: string, generateNotification: (title: string, type: string) => void,
    type: string, title: string): Promise<void> {
    try {
        const response: AxiosResponse = await axios.delete(`${API_URL}/${id}`);
        if (response.status === 204) {
            mutate(API_URL);
            generateNotification(title, type);
            console.log('Book deleted', response.data);
        } else {
            console.log('Failed to delete book', response.statusText);
        }
    }
    catch (err) {
        console.error('Error deleting book', err);
        throw err;
    }
}



export function useBooks() {
    const { data: bookList, error, isLoading, isValidating } = useSWR<Book[]>(API_URL, getBooks);
    return {
        bookList,
        isLoading,
        isValidating,
        error,
        addBook,
        deleteBook,
        updateBook
    };
}