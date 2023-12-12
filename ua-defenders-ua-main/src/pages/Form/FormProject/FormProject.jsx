import React, { useState, createRef } from 'react';

import Button from '../../../common/components/Button';

import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
// import RadioBtn from './components/RadioBtn';
import RadioBtn from '../components/RadioBtn';
import styles from './formProject.module.css';

import URL from '../../../common/helper/url';
import FileInput from "../components/FileInput";
import FileInput2 from "../components/FileInput2/FileInput";

const FormProject = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		details: '',
		sum: '',
		location: '',
		contact: '',
		category: '',
		documents: [],
		photos: null
	});

	const { title, description, details, location, contact, category, sum, documents, photos } = formData;

	const handleChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const fileChange = e => {
		setFormData({...formData, [e.target.name]: e.target.files})
	}



	const handleSubmit = async e => {
		e.preventDefault();
		if (title && description && details && location && contact && category) {
			const multipartFormData = new FormData();
			multipartFormData.append('title', formData.title);
			multipartFormData.append('description', formData.description);
			multipartFormData.append('details', formData.details);
			multipartFormData.append('location', formData.location);
			multipartFormData.append('sum', formData.sum);
			multipartFormData.append('contact', formData.contact);
			multipartFormData.append('category', formData.category);
			multipartFormData.append('photos', formData.photos[0]);
			for (const document of formData.documents) {
				multipartFormData.append('documents', document);
			}


			const response = await fetch(`${URL}/api/charityProject/`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
				body: multipartFormData
			});

			if (response.ok) {
				setFormData({
					title: '',
					description: '',
					details: '',
					sum: '',
					location: '',
					contact: '',
					category: '',
					documents: [],
					photos: null

				});
				navigate('/charity-project', { replace: true });
			} else {
				alert('Помилка при відпраці даних');
			}
		} else {
			alert('Будь ласка, заповніть всі поля');
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.name}>
				<h2>Створити заявку на благодійний проект</h2>
				<p>За допомогою цієї форми ви можете розказати про  благодійний проект.

					Разом ми Україна! Слава Україні!
				</p>
			</div>
			<form onSubmit={handleSubmit} encType='multipart/form-data'>
				<Input label="Назва (коротко про суть)" name="title" type="text" value={title} onChange={handleChange} />
				<Input label="Опис проєкту (детальний опис)" name="description" type="text" value={description} onChange={handleChange} />
				<Input label="Вкажіть реквізити банку" name="details" type="text" value={details} onChange={handleChange} />
				<Input label="Скільки потрібно зібрати" name="sum" type="text" value={sum} onChange={handleChange} />
				<Input label="Локація" name="location" type="text" value={location} onChange={handleChange} />
				<Input label="Як з вами контактувати?" name="contact" type="text" value={contact} onChange={handleChange} />
				<FileInput label="Документи" name="documents" type="file" onChange={fileChange} buttonName={"Завантажити Документ"} />
				<FileInput2 label="Фотографії" name="photos" type="file" onChange={fileChange} buttonName={"Завантажити Фотографію"} />

				<RadioBtn label="Категорія" name="category" value={category} onChange={handleChange} options={['Автомобілі', 'Бронежилети', 'Тепловізори', 'Військовий одяг', 'Рація', 'Генератори', 'Дрони', 'Медикаменти', 'Військове спорядження', 'Інше']} />
				<button className={styles.submit} type="submit">Надіслати</button>
			</form>
		</div>
	);
};

export default FormProject;