import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRegisterForm from '../components/LoginRegisterForm';
import Login from './Login';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username,
            password
        };

        try {
            const response = await fetch('https://diet-delight-backend.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error ('Registration failed.');
            }

            setRegisterStatus('Registration successful.')
            setMessage(`New user: '${result.username}'`)
            setPassword('');

        } catch (error) {
            console.error(error.message);
            setRegisterStatus(error.message);
            setMessage(`Username '${username}' already exist.`);
        }
    };

    useEffect(() => {
        if (registerStatus === 'Registration successful.') {
            navigate('/login', { state: { user: username } });
        }
    }, [registerStatus]);

    return (
        <main className="section is-flex is-align-items-center is-justify-content-center">
            <div>
                <LoginRegisterForm
                    label={'Register'}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                    option={'Login'}
                />
                
                {/* Display error message if registration failed */}
                {registerStatus && <p>{registerStatus}</p>}
                {message && <p>{message}</p>}
            </div>
        </main>
    )
}

export default Register