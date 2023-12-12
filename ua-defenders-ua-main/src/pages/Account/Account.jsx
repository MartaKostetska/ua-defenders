import React, { useEffect, useState } from 'react';
import styles from './account.module.css';
import PersonInfo from "./components/PersonInfo";
import PasswordChange from "./components/PasswordChange";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../common/hook/useAuth";
import URL from "../../common/helper/url";
import Requests from "./components/Requests";

const Account = () => {
    const [selectedItem, setSelectedItem] = useState(0)
    const { signout} = useAuth();

    const handleExit = () => {
        const userResponse = window.confirm('Ви впевнені, що хочете вийти?');

        if (userResponse) {
            alert('Вихід виконано');
            signout();
        } else {
            alert('Вихід відмінено');
        }
    };


    const handleAccountDelete = async () => {
        const userResponse = window.confirm('Ви впевнені, що хочете видалити аккаунт?');
        if (userResponse) {
            const response = await fetch(`${URL}/api/users/me/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                signout()
                alert('Аккаунт видалено');
            }
        } else {
            alert('Відмінено');
        }
    }

    const handleItemClick = (itemName) => {
        setSelectedItem(itemName);
    }

    return (<div className={styles.block}>
        <div className={styles.block__row}>
            <div className={styles.block__element}>
                <div>
                    <div className={styles.block_menu}>
                        <h1 className={styles.title_menu}>Особистий кабінет</h1>
                        <div className={styles.block__row_menu}>
                            <div className={`${styles.block__element_menu} ${selectedItem === 0 ? styles.active : ''}`}
                                 onClick={() => handleItemClick(0)}>
                                <div className={styles.block__content_menu}>Персональна Інформація</div>
                            </div>
                            <div className={`${styles.block__element_menu} ${selectedItem === 1 ? styles.active : ''}`}
                                 onClick={() => handleItemClick(1)}>
                                <div className={styles.block__content_menu}>Створені запити</div>
                            </div>
                            <div className={`${styles.block__element_menu} ${selectedItem === 2 ? styles.active : ''}`}
                                 onClick={() => handleItemClick(2)}>
                                <div className={styles.block__content_menu}>Зміна паролю</div>
                            </div>
                            <div className={`${styles.block__element_menu} ${selectedItem === 3 ? styles.active : ''}`}
                                 onClick={() => handleExit()}>
                                <div className={styles.block__content_menu}>Вийти</div>
                            </div>
                            <div className={`${styles.block__element_menu} ${selectedItem === 4 ? styles.active : ''}`}
                                 onClick={() => handleAccountDelete()}>
                                <div className={styles.block__content_menu}>Видалити акаунт</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.block__element2}>
                {selectedItem === 0 && <PersonInfo />}
                {selectedItem === 1 && <Requests/>}
                {selectedItem === 2 && <PasswordChange />}
            </div>
            </div>
    </div>);
}

export default Account;