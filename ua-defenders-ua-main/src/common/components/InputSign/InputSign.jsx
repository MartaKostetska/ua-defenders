import React from 'react';

import styles from './inputSign.module.css';

const InputSign = ({ type, placeholder, onChange, name }) => {
	return (
		<input className={styles.input} type={type} placeholder={placeholder} onChange={onChange} name={name} />
	);
};

export default InputSign;