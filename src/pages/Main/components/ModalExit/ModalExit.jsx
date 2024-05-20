import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ModalExit.css';

export default function ModalExit({ closeModal }) {
    const navigate = useNavigate();

    return (
        <div className='modal modal-overlay'>
            <button className='close-button-cross' onClick={closeModal}>✕</button>
            <h1 className='text-center'>Вы хотите выйти?</h1>
            <div className='btn-group-modal'>
                <button className='btn btn-modal b-blue' onClick={() => { navigate('/'); closeModal(); }}>Да</button>
                <button className='btn btn-modal' onClick={closeModal}>Нет</button>
            </div>
        </div>
    );
}
