import React from 'react';
import styles from './fileInput.module.css';
import { useRef } from 'react';
//<input className={styles.input} type={type} name={name} onChange={onChange}  placeholder='Ваша відповідь' ></input>
const FileInput2 = ({ label, name, type, buttonName, onChange }) => {
    const hiddenFileInput = useRef(null);
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <label htmlFor="fileInput2" className={styles.customFileInputLabel}>
                {buttonName}
            </label>
            <input type={type} name={name} id="fileInput2" onChange={onChange} className={styles.customFileInput} />
        </div>
    );
};

export default FileInput2;