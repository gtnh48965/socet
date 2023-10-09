import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './components/router/AppRouter';
import io from 'socket.io-client';

import { UserProvider } from './components/context/UserContext'; // Импортируйте UserProvider из вашего контекста

function App() {
    const [message, setMessage] = useState<{ name: string; text: string }>();
    const [activeMessage, setActiveMessage] = useState(false);

    useEffect(() => {
        const socket = io('http://localhost:5000/'); // Замените адрес и порт на адрес вашего сервера Socket.IO

        socket.on('connect', () => {
            console.log('Соединение установлено');
        });

        socket.on('message', (data: any) => {
            console.log('Получено сообщение:', data);
            setActiveMessage(true);
            setMessage(data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setActiveMessage(false);
        }, 3000);
    }, [message]);

    return (
        <div className="App">
            <div className={`messages ${activeMessage ? 'active' : ''}`}>
                <div className={'name'}>{message?.name} </div>
                <div>{message?.text}</div>
            </div>
            <div className="container">
                <UserProvider>
                    <AppRouter />
                </UserProvider>
            </div>
        </div>
    );
}

export default App;
