// import React from 'react';

// import styles from './button.module.css';

// const Button = ({ text }) => {
// 	return (
// 		<button className={styles.button}>
// 			{text}
// 		</button>
// 	);
// };

// export default Button;


import React from 'react';

import styles from './button.module.css';


const Button = ({ text, id = '', fn = () => console.log('') }) => {
	return (
		<button onClick={() => fn(id)} className={styles.button}>
			{text }
		</button>
	);
};

export default Button;