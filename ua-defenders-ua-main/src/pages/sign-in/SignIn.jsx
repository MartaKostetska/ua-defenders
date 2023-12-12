import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../common/hook/useAuth';
import useFetch from '../../common/hook/useFetch';
import { ReactComponent as Logo } from '../../assets/svg/Logo.svg';
import Header from '../../common/components/Header';
import InputSign from '../../common/components/InputSign';
import Button from '../../common/components/Button';
import styles from './signIn.module.css';

const SignIn = () => {
	const [dataForm, setDataForm] = useState({ email: '', password: '' });
	const { responseData, fetchData } = useFetch('login');
	const navigate = useNavigate();
	const location = useLocation();
	const { signin } = useAuth();
	const fromPage = location.state?.from?.pathname || '/';

	useEffect(() => {
		if (responseData.successful) {
			localStorage.setItem('token', responseData.token);
			signin(responseData.token, () => navigate(fromPage, { replace: true }));
		}
	}, [responseData, navigate, fromPage, signin]);

	const handlerInput = (e) => {
		const formData = { [e.target.name]: e.target.value };
		setDataForm((prev) => ({ ...prev, ...formData }));
	};

	const handlerForm = (e) => {
		e.preventDefault();
		fetchData(dataForm);
	};

	return (
		<div>
			<div className={styles.box}>
				<div className={styles.wrapper}>
					<Logo className={styles.logo} />
					<form className={styles.form} onSubmit={handlerForm}>
						<InputSign
							type="email"
							placeholder="Введіть пошту"
							value={dataForm.email}
							onChange={handlerInput}
							name="email"
						/>
						<InputSign
							type="password"
							placeholder="Введіть пароль"
							value={dataForm.password}
							name="password"
							onChange={handlerInput}
						/>
						<Button text="Вхід" type="submit" />
					</form>
					<p className={styles.tip}>
						Якщо ви не маєте акаунта, ви можете{' '}
						<Link to="/sign-up">
							<span className="link-helper">Зареєструватись</span>
						</Link>
					</p>
				</div>
				<div className={styles.bottom}>
					<p>Все буде Україна</p>
				</div>
			</div>
		</div>
	);
};

export default SignIn;