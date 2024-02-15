import React, { ReactNode, createContext, useContext, useState } from 'react';
import type { Book } from './api/api';

interface BookModalProviderProps {
    children: ReactNode;
}

interface BookModalContextType {
    open: boolean;
    isEditing: boolean;
    initialValues: Book;
    notification: string | null;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    switchToEditingModal: (values: Book) => void;
    generateNotification: (title: string, type: string) => void;
    NotificationTypes: typeof NotificationTypes;
}

const defaultValues = {
    id: '',
    author: '',
    title: '',
    genre: '',
    description: ''
};

enum NotificationTypes {
    ADD = 'added',
    UPDATE = 'updated',
    DELETE = 'deleted'
};

const notifications = (title: string) => {
    return {
        [NotificationTypes.ADD]: `Book ${title} added successfully`,
        [NotificationTypes.UPDATE]: `Book ${title} updated successfully`,
        [NotificationTypes.DELETE]: `Book ${title} was deleted`
    };

};

const BookModalContext = createContext<BookModalContextType>({
    open: false,
    isEditing: false,
    notification: null,
    NotificationTypes: NotificationTypes,
    initialValues: defaultValues,
    handleOpenModal: () => { },
    handleCloseModal: () => { },
    switchToEditingModal: () => { },
    generateNotification: () => { }
});

export const useBookModal = () => useContext(BookModalContext);

export const BookModalProvider: React.FC<BookModalProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [initialValues, setInitialValues] = useState<Book>(defaultValues);
    const [notification, setNotification] = useState<string | null>(null);

    const handleOpenModal = () => {
        setOpen(true);
        setNotification(null);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setIsEditing(false);
        setInitialValues(defaultValues);
    };

    const switchToEditingModal = (values: Book) => {
        setOpen(true);
        setIsEditing(true);
        setInitialValues(values);
    };

    const generateNotification = (title: string, type: string) => {
        setNotification(notifications(title)[type]);
    };

    return (
        <BookModalContext.Provider value={{
            open,
            switchToEditingModal,
            isEditing,
            handleOpenModal,
            handleCloseModal,
            initialValues,
            notification,
            generateNotification,
            NotificationTypes
        }}>
            {children}
        </BookModalContext.Provider>
    );
};