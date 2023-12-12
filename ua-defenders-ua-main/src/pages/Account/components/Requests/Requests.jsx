import React, {useEffect, useState} from "react";
import URL from "../../../../common/helper/url";
import Panel from "./Panel";
import Feed from "./Feed";


const Requests = () => {
    const [activeType, setActiveType] = useState('charityProject');
    const [data, setData] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        fetch(`${URL}/api/${activeType}/getAllByUserId`, options)
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                const fieldName = Object.keys(data)[0];
                const fieldValue = data[fieldName];
                setData(fieldValue);
            })
            .catch((err) => console.log('error'));
    }, [activeType]);

    console.log(data);

    const handleCardMenuClick = (type) => {
        setActiveType(type);
    };
    const handleDelete = async (id, oldImg, oldDocs) => {
        try {
                    const multipartFormDataDel = new FormData();
                    multipartFormDataDel.set('prevImg', oldImg);
                    multipartFormDataDel.set('prevDocument', oldDocs);
                const response = await fetch(`${URL}/api/${activeType}/deleteById/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: multipartFormDataDel
                });

            if (response.ok) {
                const updatedData = data.filter((item) => item._id !== id);
                setData(updatedData);
            } else {
                console.log('Помилка при видаленні');
            }
        } catch (error) {
            console.error('Помилка при видаленні:', error);
        }
    };

    return (
        <div>
            <Panel activeType={activeType} onCardMenuClick={handleCardMenuClick} />
            {data && data.length > 0 ? (
                <Feed data={data} typeCard={activeType} handleDelete={handleDelete} />
            ) : (
                <p>No data to display.</p>
            )}
        </div>
    );
};

export default Requests;