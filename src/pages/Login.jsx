import React from 'react'
import { Link } from 'react-router-dom'
import Register from './Register'

const Login = () => {
    return (
        <div>
            Login
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login
