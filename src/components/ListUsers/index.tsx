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

    const postGate = () => {
        if (listPeople) {
            axios.get('https://reqres.in/api/users/').then((e) => {
                e.data.data.map((e: userData) => addUser(e));
                setLoader(true);
            });
        } else setLoader(true);
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
        </div>
    );
};

export default ListUsers;
