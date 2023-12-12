import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../common/components/Button';

import Input from '../components/Input';

import styles from './formFeedback.module.css';

import URL from '../../../common/helper/url';

const FormFeedback = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		message: '',
		contact: ''
	});

	const [isLoading, setIsLoading] = useState(false);

	const { message, contact } = formData;

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const sendFormData = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${URL}/api/feedback`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(formData),
			});
			if (!response.ok) throw new Error('Помилка при відправці форми');
			setFormData({
				message: '',
				contact: ''
			});
			navigate('/', { replace: true });
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
		setIsLoading(false);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (message && contact) {
			sendFormData();
		} else {
			alert('Будь ласка, заповніть усі поля');
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.name}>
				<h2>Зворотній зв’язок</h2>
				<p>
					За допопмогою цієї форми ви можете звязатись з командою волонтерів що займаються розробкою та модерацією сайту та контенту.
				</p>
			</div>
			<form onSubmit={handleSubmit}>

				<Input
					label="Напишіть нам"
					name="message"
					type="message"
					value={formData.message}
					onChange={handleChange}
				/>
				<Input
					label="Як з Вами контактувати?"
					name="contact"
					type="text"
					value={formData.contact}
					onChange={handleChange}
				/>

				<button className={styles.submit} type="submit">Надіслати</button>
			</form>
		</div>
	);
};

export default FormFeedback;