import React, { useState } from 'react';

import Button from '../../../common/components/Button';

import Input from '../components/Input';
// import RadioBtn from './components/RadioBtn';
import RadioBtn from '../components/RadioBtn';
import styles from './formWarrior.module.css';

import URL from '../../../common/helper/url';
import { useNavigate } from 'react-router-dom';
import FileInput from "../components/FileInput";
import FileInput2 from "../components/FileInput2/FileInput";

const FormWarrior = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		location: '',
		militaryPoint: '',
		history: '',
		medicine: '',
		sum: '',
		details: '',
		contact: '',
		documents: [],
		photos: null
	});

	const [isLoading, setIsLoading] = useState(false);

	const { name, location, militaryPoint, history, medicine, details, contact, sum, documents, photos } = formData;

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const fileChange = e => {
		setFormData({...formData, [e.target.name]: e.target.files})
	}

	const sendFormData = async () => {
		setIsLoading(true);
		try {
			const multipartFormData = new FormData();
			multipartFormData.set('name', formData.name);
			multipartFormData.set('location', formData.location);
			multipartFormData.set('militaryPoint', formData.militaryPoint);
			multipartFormData.set('history', formData.history);
			multipartFormData.set('medicine', formData.medicine);
			multipartFormData.set('sum', formData.sum);
			multipartFormData.set('details', formData.details);
			multipartFormData.set('contact', formData.contact);
			multipartFormData.set('photos', formData.photos[0]);
			for (const document of formData.documents) {
				multipartFormData.append('documents', document);
			}
			const response = await fetch(`${URL}/api/warriorRehabilitation`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
				body: multipartFormData,
			});
			if (!response.ok) throw new Error('Помилка при відправці форми');
			setFormData({
				name: '',
				location: '',
				militaryPoint: '',
				history: '',
				medicine: '',
				sum: '',
				details: '',
				contact: '',
				documents: [],
				photos: null
			});

			navigate('/warrior-rehabilitation', { replace: true });
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
		setIsLoading(false);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (name && location && militaryPoint && history && medicine && sum &&  details && contact) {
			sendFormData();
		} else {
			alert('Будь ласка, заповніть усі поля');
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.name}>
				<h2>Реабілітація військового</h2>
				<p>
					За допомогою цієї форми ви можете розказати про  вашу проблему, історію поранення та надати інформацію необхідну для надання фінансової допомоги.
				</p>
			</div>
			<form onSubmit={handleSubmit}>
				<Input
					label="Прізвище, Ім'я, По-батькові"
					name="name"
					type="text"
					value={formData.name}
					onChange={handleChange}
				/>
				<Input
					label="Локація"
					name="location"
					type="text"
					value={formData.location}
					onChange={handleChange}
				/>
				<Input
					label="Військова частина"
					name="militaryPoint"
					type="text"
					value={formData.militaryPoint}
					onChange={handleChange}
				/>
				<Input
					label="Військова історія та поранення"
					name="history"
					type="text"
					value={formData.history}
					onChange={handleChange}
				/>
				<Input
					label="Історія лікування"
					name="medicine"
					type="text"
					value={formData.medicine}
					onChange={handleChange}
				/>
				<Input
					label="Сума, яку потрібно зібрати"
					name="sum"
					type="text"
					value={formData.sum}
					onChange={handleChange}
				/>
				<Input
					label="Вкажіть реквізити банку"
					name="details"
					type="text"
					value={formData.details}
					onChange={handleChange}
				/>
				<Input
					label="Як з Вами можна контактувати?"
					name="contact"
					type="text"
					value={formData.contact}
					onChange={handleChange}
				/>
				<FileInput
					label="Документи"
					name="documents"
					type="file"
					onChange={fileChange}
					buttonName={"Завантажити документ"}
				/>
				<FileInput2
					label="Фотографії"
					name="photos"
					type="file"
					onChange={fileChange}
					buttonName={"Завантажити Фотографію"} />
				<button className={styles.submit} type="submit">Відправити</button>
			</form>
		</div>
	);
};

export default FormWarrior;