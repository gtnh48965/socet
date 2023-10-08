import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from './index.module.scss'
import {Link} from "react-router-dom";
import {PropagateLoader} from "react-spinners";
// import {PropagateLoader} from "react-spinners";
interface userData {
    id: string,
    avatar: string,
    first_name: string,
    email: string,
    last_name: string
}

const ListUsers = () => {
    const [listPeople, setListPeople] = useState<userData[]>()
    const [loader, setLoader] = useState(false)
    const postGate = () => {
        axios.get('https://reqres.in/api/users/').then((e) => {
            setListPeople(e.data.data)
            setLoader(true)
        })
    }
    useEffect(() => {
        postGate()
    }, [])

    if (!loader) {
        return <div className={styles.isLoaderContainer}><PropagateLoader size={16} color={'#6100FF'}/></div>
    }
    return (
        <div className={styles.containerListPeople}>
            {listPeople && listPeople.length && listPeople.map((elem) => {
                return (<Link to={`/user/${elem.id}`} className={styles.link}>
                        <div key={elem.id} className={styles.wrapElem}>
                            {/*{elem.first_name}*/}
                            <img alt={''} className={styles.avatar} src={elem.avatar}/>
                            <div className={styles.wrapUser}>
                                <div className={styles.name}>{elem.first_name}</div>
                                <div>{elem.last_name}</div>
                                <div>{elem.email}</div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
};

export default ListUsers;
