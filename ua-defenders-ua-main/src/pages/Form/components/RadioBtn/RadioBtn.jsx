import React from 'react';
import styles from './radioBtn.module.css';

const RadioBtn = ({ label, name, value, onChange, options }) => {
	return (
		<div className={styles.container}>
			<label className={styles.label} htmlFor={name}>{label}</label>
			<select className={styles.select} name={name} value={value} onChange={onChange} required>
				<option value="">Оберіть категорію</option>
				{options.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default RadioBtn;