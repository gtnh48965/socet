import React from 'react';
import User from "../../components/User";
import styles from "./index.module.scss"
const UserPage = () => {
    return (
        <div className={styles.userContainer}>
            <User/>
        </div>
    );
};

export default UserPage;
