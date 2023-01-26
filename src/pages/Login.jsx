import React, {useState} from 'react';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(email)
    }

    return (
        <div className='submit-form-container'>
            <h2>Login</h2>
            <form className='form-data'>
                <label htmlFor="email">email</label>
                <input value={email} type="email" placeholder="your@email.com" name="email"/>
                <label htmlFor="password">password</label>
                <input value={password} type="password" placeholder="*****" name="password"/>
                <button>LogIn</button>
            </form>
            <button onClick={() => props.togglePage('register')}>New Here? Register Now</button>
        </div>
    )
}