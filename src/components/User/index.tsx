import React, { useLayoutEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import styles from './index.module.scss'
import {PropagateLoader} from "react-spinners";

interface userData {
    id: string,
    avatar: string,
    first_name: string,
    email: string,
    last_name: string
}

const User = () => {
    const {id} = useParams();
    const [userData, setUserData] = useState<userData>()
    const [loader, setLoader] = useState(false)
    const deleteData = () => {
        axios.delete(`https://reqres.in/api/users/${id}`)
            .then((e) => {alert('запрос на удаление прошел')})
            .catch(()=>{})
    }
    const postDate = () => {
        axios.get(`https://reqres.in/api/users/${id}`).then((e) => {
            setUserData(e.data.data)
            setLoader(true)
        })
    }
    useLayoutEffect(() => {
        postDate()
    }, [])
    if (!loader) {
        return <div className={styles.isLoaderContainer}><PropagateLoader size={16} color={'#6100FF'}/></div>
    }
    return (
        <div className={styles.wrapUser}>
            <img alt={''} src={userData?.avatar}/>
            <Link className={styles.back} to={'/'}>{'<back'}</Link>
            <div>
                <div>{userData?.first_name}</div>
                <div>{userData?.last_name}</div>
                <div>{userData?.email}</div>
            </div>
            <button className={styles.delete} onClick={()=>deleteData()}>delete</button>
        </div>
    );
};

export default User;
