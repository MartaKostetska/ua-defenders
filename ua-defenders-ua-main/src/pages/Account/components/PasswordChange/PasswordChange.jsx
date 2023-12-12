import React, {useState} from "react";
import styles from './passwordChange.module.css';
import URL from "../../../../common/helper/url";
import {useNavigate} from "react-router-dom";


const PasswordChange = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        checkPassword: '',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (formData.oldPassword && formData.newPassword === formData.checkPassword) {
            const response = await fetch(`${URL}/api/users/me/password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData({
                    oldPassword: '',
                    newPassword: '',
                    checkPassword: '',
                });
                navigate('/sign-in', {replace: true});
            } else {
                alert('Помилка при відправці даних');
            }
        } else {
            alert('Будь ласка, заповніть всі поля');
        }
    };
    return (
        <div>
            <div className={styles.block}>
                <div className={styles.block__row}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.block__element} >
                            <label className={styles.label_input}>Поточний пароль</label>
                            <input className={styles.input_element} onChange={handleChange} value={formData.oldPassword} type={"text"} name="oldPassword"></input>
                        </div>
                        <div className={styles.block__element} >
                            <label className={styles.label_input}>Новий пароль</label>
                            <input className={styles.input_element} onChange={handleChange} value={formData.newPassword} type={"text"} name="newPassword"></input>
                        </div>
                        <div className={styles.block__element} >
                            <label className={styles.label_input}>Повторіть новий пароль</label>
                            <input className={styles.input_element} onChange={handleChange} value={formData.checkPassword} type={"text"} name="checkPassword"></input>
                        </div>
                        <button className={styles.submit_button} type="submit">Зберегти зміни</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordChange;

