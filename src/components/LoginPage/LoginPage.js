import React, { useState, timer } from 'react';
import LoginPageStyle from './LoginPage.module.css';
import '../GlobalStyles.css';

const LoginPage = () => {
    const [error, setError] = useState('');

    function handleInput() {
        const input = document.getElementById('password');
        input.type = 'text';
        clearTimeout(timer);
        timer = setTimeout(() => {
            input.type = 'password';
        }, 500); 
    }

    const login = () => {
        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        fetch("http://localhost:8080/api/v1.0/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    const date = new Date();
                    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
                    document.cookie = `user_id=${data}; expires=${date.toUTCString()}`;
                    window.location.href = "http://localhost:3000/";
                });
            } else if (response.status === 401) {
                setError("Incorrect username or password");
            } else if (response.status === 404) {
                setError("User not found");
            } else if (response.status === 500) {
                setError("Server error");
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setError('An error occurred while logging in');
        });
    };

    const register = () => {
        window.location.href = "http://localhost:3000/register";
    };

    return (
        <div>
            <div className="header">
                <div className="header-item"></div>
            </div>

            <div className={LoginPageStyle['login-form']} id="login-form"></div>

            <label htmlFor="username" 
                    className={LoginPageStyle['username-label']}>Email or login:</label>
            <input type="text" name="username" 
                    className={LoginPageStyle['username-input']} id="username"/>

            <label htmlFor="password" 
                    className={LoginPageStyle['password-label']}>Password:</label>
            <input type="password" name="password" 
                    className={LoginPageStyle['password-input']} 
                    id="password" onInput={handleInput}/>

            <input type="button" value="Log In" id="log-in-btn" 
                    className={LoginPageStyle['log-in-btn']} onClick={login} />

            {error && <div id="error" 
                        className={LoginPageStyle['error-message']}>{error}</div>}

            <input type="button" value="Create Account" id="sign-up" 
                    className={LoginPageStyle['sign-up-btn']} onClick={register} />
        </div>
    );
};

export default LoginPage;
