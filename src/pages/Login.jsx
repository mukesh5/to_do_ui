import React, {useState} from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: ""
        }
    }

    const handleLogin = (e) => {
        if (email === ''){
            alert('Email is required')
        }
        else if (password === ''){
            alert('Password is required')
        }
        else{
            const payload = {
                email: email,
                password: password
            }
            axios.post(`${BASE_URL}/login`, payload, config).then(res =>{
                alert('You are successfully logged in')
                localStorage.setItem('token', res.data?.token)
                props.setAuthentication(true)
            }).catch(err => {
                console.log(err)
                const errMessage = err.request.response
                alert(errMessage)
            })
        }
        e.preventDefault();
    }

    return (
        <div className='submit-form-container'>
            <h2>Login</h2>
            <form className='form-data' onSubmit={handleLogin}>
                <label htmlFor="email">email</label>
                <input value={email} type="email" placeholder="your@email.com" name="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">password</label>
                <input value={password} type="password" placeholder="*****" name="password" onChange={(e) => setPassword(e.target.value)}/>
                <button>LogIn</button>
            </form>
            <button onClick={() => props.togglePage('register')}>New Here? Register Now</button>
        </div>
    )
}