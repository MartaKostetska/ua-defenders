import React from 'react';
import styles from './input.module.css'

const Input = ({ label, name, type, value, onChange }) => {
	return (
		<div className={styles.container}>
			<label className={styles.label} htmlFor={name}>{label}</label>
			<input className={styles.input} type={type} name={name} value={value} onChange={onChange}  placeholder='Ваша відповідь' required />
		</div>
	);
};

export default Input;