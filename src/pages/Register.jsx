import React, { useState } from 'react'
import './Register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');
    const [message, setMessage] = useState('');

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
                throw new Error ('Registration failed.', result);
            }

            setRegisterStatus('Registration successful.')
            setMessage(`New user: '${result.username}'`)
            setUsername('');
            setPassword('');

        } catch (error) {
            console.error(error.message);
            setRegisterStatus(error.message);
            setMessage(`Username '${username}' already exist.`);
        }
    };

    return (
        <main className="section is-flex is-align-items-center is-justify-content-center">
            <div>
                <form onSubmit={handleSubmit} className="form-container box">
                    <h2 className="title is-2 has-text-centered">Register</h2>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <br/>
                        <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <br/>
                        <input 
                            type="password" 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="button is-warning is-normal mt-5">Register</button>
                </form>
                {registerStatus && <p>{registerStatus}</p>}
                {message && <p>{message}</p>}
            </div>
        </main>
    )
}

export default Register