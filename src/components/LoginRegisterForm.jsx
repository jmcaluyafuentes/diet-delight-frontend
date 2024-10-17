import React from 'react'
import { Link } from 'react-router-dom'

const LoginRegisterForm = (props) => {
    const {label, username, setUsername, password, setPassword, handleSubmit, option} = props;
    
    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="form-container box" style={{ marginBottom:'1rem' }}>
                    <h2 className="title is-2 has-text-centered">{label}</h2>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <br/>
                        <input 
                            type="text" 
                            id="username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ height:'1.5rem'}}
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
                            style={{ height:'1.5rem'}}
                        />
                    </div>
                    <button type="submit" className="button is-warning is-normal mt-5">{label}</button>
                    <div style={{ display:'block', marginTop:'1rem' }}>
                        <Link to={`/${option}`}>{option}</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginRegisterForm