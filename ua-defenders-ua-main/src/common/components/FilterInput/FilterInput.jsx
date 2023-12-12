import React, { useState } from 'react';

import styles from './filterInput.module.css';

const InputSign = ({ handleFilter }) => {
	return (
		<input className={styles.input} type='text' placeholder='Введіть імя' onChange={handleFilter} />
	);
};

export default InputSign;