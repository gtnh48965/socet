import React, { createContext, useContext, useState, ReactNode } from 'react';

// Определяем интерфейс для данных пользователя
interface UserData {
    id: number;
    avatar: File | null;
    first_name: string;
    email: string;
    last_name: string;
}

// Создаем контекст
interface UserContextType {
    listPeople: UserData[];
    addUser: (user: UserData) => void;
    getUserById: (id: number) => UserData | undefined;
    deleteUserById: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [listPeople, setListPeople] = useState<UserData[]>([]);

    const addUser = (user: UserData) => {
        setListPeople((prevListPeople) => [...prevListPeople, user]);
    };

    const getUserById = (id: number) => {
        return listPeople.find((user) => user.id === id);
    };

    const deleteUserById = (id: number) => {
        setListPeople((prevListPeople) => prevListPeople.filter((user) => user.id !== id));
    };

    const value: UserContextType = {
        listPeople,
        addUser,
        getUserById,
        deleteUserById,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Создаем хук для доступа к контексту
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
