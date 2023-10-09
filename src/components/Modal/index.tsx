import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styles from './index.module.scss'
import {useUser} from "../context/UserContext";

interface modalProps{
    openModal:boolean,
    modalClose:  React.Dispatch<React.SetStateAction<boolean>>
}
interface userData {
    id: number;
    avatar: File | null;
    first_name: string;
    email: string;
    last_name: string;
}
const Modal = (modalProps: modalProps) => {
    const {openModal, modalClose} = modalProps
    const { listPeople, addUser } = useUser();
    const [newUser, setNewUser] = useState({
        avatar: null as File | null,
        first_name: '',
        last_name: '',
        email: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    useEffect(() => {
        if (openModal)
            document.body.style.overflow = "hidden";
        else document.body.style.overflow = "inherit";

    }, [openModal]);

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
            modalClose(false)
        } else {
            setFormSubmitted(true);
        }
    };
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
    return (
        <div className={`${styles.modalBg} ${openModal ? styles.modalShow : ""}`}>
            <div className={styles.modalClose} onClick={()=>modalClose(false)}/>
            <div className={styles.positionWrap}>
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
        </div>
    );
};

export default Modal;
