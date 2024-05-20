import Pagination from '../Pagination/Pagination';
import './ContentMain.css';
import { useState } from "react";

const formatDate = (date) => {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
};

export default function ContentMain({ data }) {
    const [startIndex, setStartIndex] = useState(0);
    const [value, setValue] = useState('');
    const [dataDocuments, setDataDocuments] = useState(data);
    const countVisibleRows = 5;

    const handleStartIndexChange = (newIndex) => setStartIndex(newIndex);

    const handleInputChange = (e) => {
        setValue(e.target.value);
        if (e.target.value === '') {
            return setDataDocuments(data);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = data.filter((item) => {
            const itemValues = Object.values(item);
            const matches = itemValues.filter((str) => {
                if (str instanceof Date) {
                    const stringDate = formatDate(str);
                    return stringDate.includes(value);
                }
                const formatString = str.toString();
                return formatString.toLowerCase().includes(value.toLowerCase());

            })
            return (matches.length > 0) ? true : false;
        })
        setDataDocuments(newData);
    }

    return (
        <>
            <form className='form-search' onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    className='search-input' 
                    placeholder='Введите текст'
                    value={value}  
                    onChange={handleInputChange}
                />
                <button className='btn' type='submit'>Найти</button>
            </form>
            <div className='flex-body'>
                <h1>Все документы</h1>
                <table>
                    <thead>
                        <tr>
                            <th className='text-center w-40px'>№</th>
                            <th className='w-170px'>Дата</th>
                            <th className='w-170px'>Статус</th>
                            <th className='w-170px'>Тип</th>
                            <th className='w-170px'>Номер</th>
                            <th className='w-240px'>Организация</th>
                            <th className='empty'></th>
                            <th className='empty border-right'></th>
                        </tr>
                    </thead>
                    <tbody>
                        { ((dataDocuments.length === 0) && <p className='text-message'>Совпадений не найдено</p> ) ||
                        (dataDocuments.slice(startIndex, startIndex + countVisibleRows).map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td className='text-center'>{row.id}</td>
                                    <td>{formatDate(row.date)}</td>
                                    <td className={(row.status === 'В работе') ? 'color-grey' : ''}>
                                        {row.status}
                                    </td>
                                    <td>{row.type}</td>
                                    <td>{row.number}</td>
                                    <td>{row.organization}</td>
                                    <td></td>
                                    <td className='border-right'></td>
                                </tr>
                            );
                        }))
                        }
                    </tbody>
                </table>
            </div>
            <div className='btn-group'>
                <Pagination
                    countVisibleRows={countVisibleRows} 
                    dataLength={dataDocuments.length}
                    onStartIndexChange={handleStartIndexChange}
                />
            </div>
        </>
    );
}
