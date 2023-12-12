import React, {useEffect, useState} from "react";
import styles from './personInfo.module.css';
import URL from "../../../../common/helper/url";

const PersonInfo = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        social: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${URL}/api/users/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setFormData({
                        name: data.user.name,
                        email: data.user.email,
                        phone: data.user.phone,
                        social: data.user.social,
                    });
                } else {
                    console.error('Ошибка при получении данных пользователя');
                }
            } catch (error) {
                console.error('Ошибка при выполнении запроса', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (formData.name && formData.phone && formData.email) {
            const response = await fetch(`${URL}/api/users/me/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Успішне оновлення даних");
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
                        <div className={styles.block__element}>
                            <label className={styles.label_input}>Ім'я та Прізвище</label>
                            <input className={styles.input_element} onChange={handleChange} value={formData.name}
                                   type={"text"} name="name"></input>
                        </div>
                        <div className={styles.block__element}>
                            <label className={styles.label_input}>Електронна пошта</label>
                            <input className={styles.input_element} onChange={handleChange} value={formData.email}
                                   type={"text"} name="email"></input>
                        </div>
                        <div className={styles.block__element}>
                            <label className={styles.label_input}>Номер телефону</label>
                            <input className={styles.input_element} onChange={handleChange} value={formData.phone}
                                   type={"text"} name="phone"></input>
                        </div>
                        <div className={styles.block__element}>
                            <label className={styles.label_input}>Соціальні мережі</label>
                            <input className={styles.input_social} onChange={handleChange} value={formData.social}
                                   type={"text"} name="social"></input>
                        </div>
                        <button className={styles.submit_button} type="submit">Зберегти зміни</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PersonInfo;

