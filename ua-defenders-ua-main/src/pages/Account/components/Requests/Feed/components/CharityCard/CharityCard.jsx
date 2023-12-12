import React, {useState} from 'react';


import styles from './charityCard.module.css';
import CardWrapper from "../../../../../../../common/HOCS/CardWrapper";
import URL from "../../../../../../../common/helper/url";
/*

<div className={styles.block__element}>
    <label className={styles.label_input}>Назва</label>
    <input className={styles.input_element} onChange={handleChange} value={formData.title}
           type={"text"} name="title"></input>
</div>
<div className={styles.block__element}>
    <label className={styles.label_input}>Опис</label>
    <input className={styles.input_element} onChange={handleChange} value={formData.description}
           type={"text"} name="description"></input>
</div>
<div className={styles.block__element}>
    <label className={styles.label_input}>Потрібно зібрати</label>
    <input className={styles.input_element} onChange={handleChange} value={formData.sum}
           type={"text"} name="sum"></input>
</div>
<div className={styles.block__element}>
    <label className={styles.label_input}>Реквізити банку</label>
    <input className={styles.input_element} onChange={handleChange} value={formData.details}
           type={"text"} name="details"></input>
</div>
<DocumentInput documentsrc={formData.document} prevDocument = {prevDocument} label="Документ" name="document" type="file" onChange={fileChange} buttonName={"Завантажити Документ"}/>
<PhotoInput imgsrc = {formData.img} prevImg = {prevImg} label="Фотографії" name="img" type="file" onChange={fileChange} buttonName={"Поміняти Фотографію"} />
<button className={styles.submit_button} type="submit">Зберегти зміни</button>
<button className={styles.submit_button} type="button" onClick={handleDelete}>Видалити</button>*/

const CharityCard = ({id, title, description, sum, details, img, document, handleDelete}) => {
    const oldDocs = document;
    const oldImg = img;

    const [formData, setFormData] = useState({
        title: title,
        description: description,
        sum: sum,
        details: details,
        img: img,
        document: document,
        previewImg: URL + "/" + img
    });
    const handleFileChange = (e) => {
        const files = e.target.files;

        // Assuming formData is a state variable
        setFormData((prevFormData) => ({
            ...prevFormData,
            document: [...prevFormData.document, ...files],
        }));
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const fileDelete = (index) => {
        const updatedDocuments = [...formData.document];
        updatedDocuments.splice(index, 1);
        setFormData({...formData, document: updatedDocuments});
    };
    const photoChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (event) => {
                const result = event.target.result;
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    img: file, // Оновлюємо лише img
                    previewImg: result, // Оновлюємо previewImg
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (formData.title && formData.description && formData.sum && formData.details) {
            const multipartFormData = new FormData();
            multipartFormData.append('title', formData.title);
            multipartFormData.append('description', formData.description);
            multipartFormData.append('sum', formData.sum);
            multipartFormData.append('details', formData.details);
            multipartFormData.append('photos', formData.img);
            multipartFormData.append('prevDocuments', oldDocs);
            multipartFormData.append('prevImg', oldImg);
            for (const docs of formData.document) {
                multipartFormData.append('documents', docs);
            }

            const response = await fetch(`${URL}/api/charityProject/update/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: multipartFormData
            });
            if (response.ok) {
                alert("Данні оновленні")
            } else {
                alert('Помилка при відправці даних');
            }
        } else {
            alert('Будь ласка, заповніть всі поля');
        }
    };
    return (
        <>
            <div className={styles.card}>
                <div className={styles.content}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.form_box}>
                            <div className={styles.left_column}>
                                <input className={styles.input_title} onChange={handleChange} value={formData.title}
                                       type={"text"} name="title"/>
                                <div className={styles.label_upper}>
                                    <label className={styles.label_name}>Опис</label>
                                    <textarea className={styles.input_description} onChange={handleChange}
                                              value={formData.description} type={"text"} name="description"/>
                                </div>
                                <div className={styles.label_upper}>
                                    <label className={styles.label_name}>Потрібно зібрати</label>
                                    <input className={styles.input_sum} onChange={handleChange} value={formData.sum}
                                           type={"text"} name="sum"/>
                                </div>
                                <div className={styles.label_upper}>
                                    <label className={styles.label_name}>Реквізити</label>
                                    <textarea className={styles.input_details} onChange={handleChange}
                                              value={formData.details} type={"text"} name="details"/>
                                </div>
                                <div className={styles.label_upper}>
                                    <label className={styles.label_name}>Документи</label>
                                    <div className={styles.file_list}>
                                        {formData.document && formData.document.length > 0 && formData.document.map((item, index) => (
                                            <div key={index} className={styles.white_cube}>
                                                <button className={styles.white_cube_delete}
                                                        onClick={() => fileDelete(index)}>X
                                                </button>
                                            </div>

                                        ))}
                                        <div className={styles.container}>

                                            <label htmlFor={`fileInputDocs_${id}`} className={styles.customFileInputLabel}>
                                                Завантажити ще
                                            </label>
                                            <input type="file" name="document" id={`fileInputDocs_${id}`} multiple={true}
                                                   onChange={handleFileChange} className={styles.customFileInput}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.right_img_box}>
                                <img src={formData.previewImg} className={styles.image_preview}></img>
                                <label htmlFor={`fileInput_${id}`} className={styles.customFileInputLabelPhoto}>
                                    Змінити фото
                                </label>
                                <input type="file" name="img" id={`fileInput_${id}`} onChange={photoChange}
                                       className={styles.customFileInput}/>
                            </div>
                            <div className={styles.line}></div>
                            <div>
                                <button type={"submit"} className={styles.submit_button}>Зберегти зміни</button>
                                <button type={"button"} onClick={() => handleDelete(id, oldImg, oldDocs)}
                                        className={styles.delete_button}>Видалити
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CardWrapper(CharityCard);