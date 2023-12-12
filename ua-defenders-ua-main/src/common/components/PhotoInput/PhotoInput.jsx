import React from 'react';
import styles from './photoInput.module.css'
import URL from "../../helper/url";
import { useRef } from 'react';
//<input className={styles.input} type={type} name={name} onChange={onChange}  placeholder='Ваша відповідь' ></input>
const PhotoInput = ({ label, name, type, buttonName, onChange, imgsrc, prevImg }) => {
    const hiddenFileInput = useRef(null);
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <label htmlFor="fileInput" className={styles.customFileInputLabel}>
                {buttonName}
            </label>
            <input type={type} name={name} id="fileInput" onChange={onChange} className={styles.customFileInput} />
            <img className={styles.imgAvatar} src={URL+'/'+imgsrc}/>
        </div>
    );
};

export default PhotoInput;