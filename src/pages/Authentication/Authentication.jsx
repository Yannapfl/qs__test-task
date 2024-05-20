import './Authentication.css'
import logo from '../../assests/icons/logo.svg'
import viewOff from '../../assests/icons/view_off.svg'
import viewOn from '../../assests/icons/view_on.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const errorMessage = {
    password: 'Неверный пароль',
    username: 'Пользователь не найден',
}

const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};


export default function Authentication({ usersData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const checkUser = () => {
        const isUser = usersData.users.find(user => user.username === formData.username);
        if (isUser) {
            if (isUser.password === formData.password) {
                return true;
            }
            setError(errorMessage.password);
            return false;
        }
        setError(errorMessage.username);
        return false;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTogglePassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isAuthenticated = checkUser();
        if (isAuthenticated === true) {
            const token = generateToken();
            sessionStorage.setItem('token', token);
            navigate('/main');
        } else {
            console.log(error);
        }
    };

    return (
        <form className='sign-form' onSubmit={handleSubmit}>
            <div className='text-center'>
                <img src={logo} alt='logo-qs' />
                <h1>Войти в аккаунт</h1>
            </div>
            <label className='sign-form__label'>
                Логин
                <input className='sign-form__input' type='text' name='username' value={formData.username} onChange={handleInputChange} />
            </label>
            <label className='sign-form__label'>
                Пароль
                <div className='password'>
                    <input 
                        type={ showPassword ? 'text': 'password'}
                        className='sign-form__input password-input'
                        name='password' 
                        value={formData.password} 
                        onChange={handleInputChange}
                    />
                    <button className='btn-view'type='button' onClick={handleTogglePassword}>
                        <img src={showPassword ? viewOn : viewOff} alt='view-password' />
                    </button>
                </div>
            </label>
            {error && <div className='error-message'>{error}</div>}
            <button className='btn btn-submit' type='submit'>Войти</button>
        </form>
    );
}
