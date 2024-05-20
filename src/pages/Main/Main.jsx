import React, { useState } from 'react';
import './Main.css';
import logo from '../../assests/icons/logo.svg';
import exitBtn from '../../assests/icons/btn_exit.svg';
import documentsData from '../../__fixtures__/documentsData.js';
import ContentMain from './components/ContentMain/ContentMain.jsx';
import ModalExit from './components/ModalExit/ModalExit.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate])

    return (
        <>
         {isModalOpen && <div className='modal-overlay'></div>}
            <header>
                <img src={logo} alt='qs-logo' />
                <button onClick={openModal} className='btn-exit'>
                    <img src={exitBtn} alt='btn-exit' />
                    <p>Выйти</p>
                </button>
            </header>
            <ContentMain data={documentsData} />
            {(isModalOpen) && <div className='modal-overlay' onClick={closeModal}></div>}
            {isModalOpen && <ModalExit closeModal={closeModal} />}
        </>
    );
}
