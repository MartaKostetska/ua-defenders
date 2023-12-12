import React, {useEffect, useState} from 'react';
import styles from './helpCard.module.css';
import CardWrapper from "../../../../../../../common/HOCS/CardWrapper";
import URL from "../../../../../../../common/helper/url";

const HelpCard = ({ id, contact, description,  title, location, handleDelete }) => {
	const [formData, setFormData] = useState({
		contact: contact,
		description: description,
		title: title,
		location: location,
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async e => {
		e.preventDefault();
		if (formData.contact && formData.description && formData.title && formData.location) {
			const response = await fetch(`${URL}/api/helpRequest/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				setFormData({
					contact: formData.contact,
					description: formData.description,
					title: formData.title,
					location: formData.location,
				});

			} else {
				alert('Помилка при відправці даних');
			}
		} else {
			alert('Будь ласка, заповніть всі поля');
		}
	};
	return (
		<div>
			<div className={styles.card}>
				<div className={styles.content}>
					<form onSubmit={handleSubmit}>
						<div className={styles.form_box}>
							<div className={styles.left_column}>
						<input className={styles.input_title} onChange={handleChange} value={formData.title}
							   type={"text"} name="title"/>
						<div className={styles.label_upper}>
							<label className={styles.label_name}>Опис</label>
							<textarea className={styles.input_description} onChange={handleChange}
									  value={formData.description} type={"text"} name="description"/>
						</div>
						<div className={styles.label_upper}>
							<label className={styles.label_name}>Місто</label>
							<input className={styles.input_sum} onChange={handleChange} value={formData.location}
								   type={"text"} name="location"/>
						</div>
						<div className={styles.label_upper}>
							<label className={styles.label_name}>Контакти</label>
							<input className={styles.input_sum} onChange={handleChange} value={formData.contact}
								   type={"text"} name="contact"/>
						</div>
							</div>
							<div className={styles.line}></div>
							<div className={styles.buttons_div}>
								<button type={"submit"} className={styles.submit_button}>Зберегти зміни</button>
								<button type={"button"} onClick={() => handleDelete(id)}
										className={styles.delete_button}>Видалити
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CardWrapper(HelpCard);