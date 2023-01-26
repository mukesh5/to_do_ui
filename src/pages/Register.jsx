import axios from 'axios';
import React, {useState} from 'react';
import { BASE_URL } from '../constants';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: ""
        }
    }

    const handleRegister = (e) => {
        if (email === ''){
            alert('email cannot be empty')
        }
        if (password === ''){
            alert('password cannot be empty')
        }
        if(lastName === ''){
            alert('last name cannot be empty')
        }
        const payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        }
        axios.post(`${BASE_URL}/register_user`, payload, config).then(res =>{
            alert('You are successfully registered')
            localStorage.setItem('token', res.data?.token)
            props.setAuthentication(true)
        }).catch(err => {
            console.log(err)
            const errMessage = JSON.parse(err.request.response)
            alert(errMessage)
        })
        e.preventDefault();
    }

    return (
        <div className='submit-form-container'>
            <h2>Register</h2>
            <form className='form-data' onSubmit={handleRegister}>
                <label htmlFor="firstName">First Name</label>
                <input value={firstName} type="text" placeholder="first name" name="firstName" required onChange={(e) => setFirstName(e.target.value)}/>
                <label htmlFor="lastName">Last Name</label>
                <input value={lastName} type="text" placeholder="last name" name="lastName" onChange={(e) => setLastName(e.target.value)}/>
                <label htmlFor="email">email</label>
                <input value={email} type="email" placeholder="your@email.com" name="email" required onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">password</label>
                <input value={password} type="password" placeholder="*****" name="password" required onChange={(e) => setPassword(e.target.value)}/>
                <button>Register</button>
            </form>
            <button className='link-button' onClick={() => props.togglePage('login')}>Have An Account? Login</button>
        </div>
    )
}