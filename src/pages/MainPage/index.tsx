import React, {useState} from 'react';
import ListUsers from "../../components/ListUsers";
import pluse from '../../img/plus.svg'
import styles from './index.module.scss'
import Modal from "../../components/Modal";
const MainPage = () => {
    const [isModal, setIsModal] = useState(false)
    console.log(isModal)
    return (
        <div className={styles.mainContainer}>
            <ListUsers/>
            <div className={styles.plus} onClick={()=>setIsModal(true)} >
                <img src={pluse} />
            </div>
            <Modal modalClose={setIsModal} openModal={isModal}/>
        </div>
    );
};

export default MainPage;
