import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './signUp.module.css'
import InputSign from '../../common/components/InputSign';
import Button from '../../common/components/Button';
import URL from '../../common/helper/url';
import { ReactComponent as Logo } from '../../assets/svg/Logo.svg';
const SignUp = () => {
	const navigate = useNavigate();

	const [dataForm, setDataForm] = useState({
		name: '',
		email: '',
		phone: '',
		password: '',
	});

	const [errors, setErrors] = useState({});


	const handlerInput = (event) => {
		const { name, value } = event.target;
		setDataForm((prevDataForm) => ({ ...prevDataForm, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const errors = validateForm();
		if (Object.keys(errors).length > 0) {
			setErrors(errors);
		} else {
			setErrors({});
			try {
				const response = await fetch(`${URL}/api/auth/register`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(dataForm),
				});
				const result = await response.json();
				if (response.ok) {
					alert(result.message);
					navigate('/sign-in', { replace: true });

				} else {
					alert(result.error);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	const validateForm = () => {
		const errors = {};
		if (!dataForm.name) {
			errors.name = 'Введіть ім\'я';
		}
		if (!dataForm.email) {
			errors.email = 'Введіть пошту';
		} else if (!/\S+@\S+\.\S+/.test(dataForm.email)) {
			errors.email = 'Неправильний формат пошти';
		}
		if (!dataForm.phone) {
			errors.phone = 'Введіть номер телефону';
		} else if (!/^\+?3?8?(0\d{9})$/.test(dataForm.phone)) {
			errors.phone = 'Неправильний формат номеру телефону';
		}
		if (!dataForm.password) {
			errors.password = 'Введіть пароль';
		} else if (dataForm.password.length < 6) {
			errors.password = 'Пароль має містити не менше 6 символів';
		}
		return errors;
	};

	return (
		<div>
			<div className={styles.box} >
				<div className={styles.wrapper}>
					<Logo className={styles.logo} />
					<form className={styles.form} onSubmit={handleSubmit}>
						<InputSign
							type='text'
							placeholder='Імя та прізвище'
							value={dataForm.name}
							onChange={handlerInput}
							name='name'
							error={errors.name}
						/>
						<InputSign
							type='email'
							placeholder='Електронна пошта'
							value={dataForm.email}
							onChange={handlerInput}
							name='email'
							error={errors.email}
						/>
						<InputSign
							type='text'
							placeholder='Номер телефону'
							value={dataForm.phone}
							onChange={handlerInput}
							name='phone'
							error={errors.phone}
						/>
						<InputSign
							type='password'
							placeholder='Пароль'
							value={dataForm.password}
							onChange={handlerInput}
							name='password'
							error={errors.password}
						/>
						<Button text='Зареєструватися' type='submit' />
					</form>
					<p className={styles.tip}>
						Якщо ви маєте акаунт, ви можете{' '}
						<Link to='/sign-in'>
							<span className='link-helper'>Увійти</span>
						</Link>
					</p>
				</div>


				<div className={styles.bottom}>
{/* 					<p>Все буде Україна</p> */}
				</div>
			</div>
		</div>
	);
};

export default SignUp;