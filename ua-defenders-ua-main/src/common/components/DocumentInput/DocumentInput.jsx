import React, {useState} from 'react';
import styles from './documentInput.module.css';
import { useRef } from 'react';
import URL from "../../helper/url";
//<input className={styles.input} type={type} name={name} onChange={onChange}  placeholder='Ваша відповідь' ></input>
const DocumentInput = ({ label, name, type, buttonName, onChange, prevDocument, documentsrc }) => {
    const hiddenFileInput = useRef(null);
    const [document, setDocument] = useState(documentsrc)
    const handleDelete = async e => {
        const response = await fetch(`${URL}/api/charityProject/deleteFile/${prevDocument}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            setDocument(null);
        }
    }
    return (
        <div className={styles.container}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <label htmlFor="documentInput" className={styles.customFileInputLabel}>
                {buttonName}
            </label>
            <button className={styles.deleteButton} type={"button"} onClick={handleDelete}>Видалити документ</button>
            <input type={type} name={name} id="documentInput" onChange={onChange} className={styles.customFileInput} />
            <div className={styles.docCheck}>{document}</div>
        </div>
    );
};

export default DocumentInput;