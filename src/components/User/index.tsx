import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import styles from './index.module.scss';
import { PropagateLoader } from "react-spinners";
import { useUser } from "../context/UserContext";

const User = () => {
    const { id } = useParams();
    const { getUserById, deleteUserById } = useUser();
    const navigate = useNavigate();
    const userData = getUserById(Number(id));


    const deleteData = () => {
        deleteUserById(Number(id))
    }
    useEffect(()=>{
        if(!userData)
            setTimeout(()=>{
                navigate('/')
            },2000)

    },[userData])

    return (
        <div className={styles.wrapUser}>
            <Link className={styles.back} to={'/'}>{'<back'}</Link>
            {userData?.id ?
                <>
                    {userData?.avatar ? (
                        <img
                            alt={''}
                            className={styles.avatar}
                            src={
                                typeof userData.avatar === 'string'
                                    ? userData.avatar
                                    : URL.createObjectURL(userData.avatar)
                            }
                        />
                    ) : null}

                    <div>
                        <div>{userData?.first_name}</div>
                        <div>{userData?.last_name}</div>
                        <div>{userData?.email}</div>
                    </div>
                    <button className={styles.delete} onClick={() => deleteData()}>delete</button>
                </>
                :
                <div>Пользователь удален</div>
            }
        </div>
    );
};

export default User;
