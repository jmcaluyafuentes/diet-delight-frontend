import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginRegisterForm from '../components/LoginRegisterForm';

const Login = () => {
    const location = useLocation();
    const { user } = location.state || {};
    const navigate = useNavigate();
        
    const [username, setUsername] = useState(user || '');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username, 
            password
        }

        try {
            const response = await fetch('https://diet-delight-backend.onrender.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error (result.message);
            }

            window.localStorage.setItem('userID', result.userID);

            navigate('/');
        } catch (error) {
            console.error(error.message)
            setMessage(`${error.message}!`)
        }
    }


    return (
        <main className="section is-flex is-align-items-center is-justify-content-center">
            <div>
                <LoginRegisterForm
                    label={'Login'}
                    username={username}
                    setUsername={setUsername}
                    password={password}
                    setPassword={setPassword}
                    handleSubmit={handleSubmit}
                    option={'Register'}
                    />
                {message ?? <p>{message}</p>}
            </div>
        </main>
    )
}

export default Login
