import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { useUser } from '../context/UserContext';

interface userData {
    id: number;
    avatar: File | null;
    first_name: string;
    email: string;
    last_name: string;
}

const ListUsers = () => {
    const { listPeople, addUser } = useUser();
    const [loader, setLoader] = useState(false);
    const [newUser, setNewUser] = useState({
        avatar: null as File | null,
        first_name: '',
        last_name: '',
        email: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'avatar' && files && files.length > 0) {
            setNewUser({
                ...newUser,
                [name]: files[0],
            });
        } else {
            setNewUser({
                ...newUser,
                [name]: value,
            });
        }
    };

    const postGate = () => {
        if (listPeople.length === 0) {
            axios.get('https://reqres.in/api/users/').then((e) => {
                e.data.data.map((e: userData) => addUser(e));
                setLoader(true);
            });
        } else setLoader(true);
    };

    const addUserHandler = async () => {
        if (
            newUser.first_name &&
            newUser.last_name &&
            newUser.email &&
            newUser.avatar !== null
        ) {
            const formData = new FormData();
            if (typeof newUser.avatar !== 'string') {
                formData.append('avatar', newUser.avatar);
            }

            formData.append('first_name', newUser.first_name);
            formData.append('last_name', newUser.last_name);
            formData.append('email', newUser.email);

            const newUserObj: userData = {
                id: listPeople.length + 1,
                ...newUser,
            };

            addUser(newUserObj);
            setNewUser({
                avatar: null, // Сбрасываем выбранный файл
                first_name: '',
                last_name: '',
                email: '',
            });
            setFormSubmitted(false);
        } else {
            setFormSubmitted(true);
        }
    };

    useEffect(() => {
        postGate();
    }, []);

    if (!loader) {
        return (
            <div className={styles.isLoaderContainer}>
                <PropagateLoader size={16} color={'#6100FF'} />
            </div>
        );
    }
    return (
        <div className={styles.containerListPeople}>
            {listPeople && listPeople.length && listPeople.map((elem) => {
                return (
                    <Link to={`/user/${elem.id}`} className={styles.link}>
                        <div key={elem.id} className={styles.wrapElem}>
                            {elem.avatar ? (
                                <img
                                    alt={''}
                                    className={styles.avatar}
                                    src={
                                        typeof elem.avatar === 'string'
                                            ? elem.avatar
                                            : URL.createObjectURL(elem.avatar)
                                    }
                                />
                            ) : null}
                            <div className={styles.wrapUser}>
                                <div className={styles.name}>{elem.first_name}</div>
                                <div>{elem.last_name}</div>
                                <div className={styles.emil}>{elem.email}</div>
                            </div>
                        </div>
                    </Link>
                );
            })}
            <div key={1} className={styles.formContainer}>
                <div className={styles.wrapForm}>
                    <input
                        className={styles.fileUpload}
                        type="file"
                        name="avatar"
                        onChange={handleInputChange}
                    />

                    <input
                        type="text"
                        className={styles.inputText}
                        placeholder="First Name"
                        name="first_name"
                        value={newUser.first_name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className={styles.inputText}
                        placeholder="Email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className={styles.inputText}
                        placeholder="Last Name"
                        name="last_name"
                        value={newUser.last_name}
                        onChange={handleInputChange}
                    />
                    <button className={styles.buttonForm} onClick={addUserHandler}>
                        Add User
                    </button>
                    {formSubmitted && (
                        <p className={styles.errorText}>Please fill in all fields.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListUsers;
