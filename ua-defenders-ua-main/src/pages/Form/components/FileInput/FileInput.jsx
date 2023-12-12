import React from 'react';
import styles from './fileInput.module.css';
import { useRef } from 'react';
//<input className={styles.input} type={type} name={name} onChange={onChange}  placeholder='Ваша відповідь' ></input>
const FileInput = ({ label, name, type, buttonName, onChange }) => {
    const hiddenFileInput = useRef(null);
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <label htmlFor="fileInput" className={styles.customFileInputLabel}>
                {buttonName}
            </label>
            <input type={type} multiple={true} name={name} id="fileInput" onChange={onChange} className={styles.customFileInput} />
        </div>
    );
};

export default FileInput;