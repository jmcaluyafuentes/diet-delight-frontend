import React from 'react'
import { Link } from 'react-router-dom'
import Register from './Register'

const Login = () => {
    return (
        <main className="section">
            Login
            <Link to="/register">Register</Link>
        </main>
    )
}

export default Login
