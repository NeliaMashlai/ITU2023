/*
 * Project: ITU project - Garage sale website
 * @file LoginPage.js

 * @brief ReactJS component of the login page of the website

 * @author Maksym Podhornyi - xpodho08
*/

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginPageStyle from './LoginPage.module.css';
import { API_BASE_URL, fixElementHeight } from '../Utils';
import '../GlobalStyles.css';
let timer;

const LoginPage = () => {
    
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const elementRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (elementRef.current) {
            fixElementHeight(elementRef.current);
        }
    } , []);

    function handleInput() {
        const input = document.getElementById('password');
        input.type = 'text';
        clearTimeout(timer);
        timer = setTimeout(() => {
            input.type = 'password';
        }, 500); 
    }

    const login = async () => {
        const data = {
            username: username,
            password: password,
        };
    
        try {
            const response = await fetch(API_BASE_URL + "/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                const userData = await response.json();
                const date = new Date();
                date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
                document.cookie = `user_id=${userData}; expires=${date.toUTCString()}; path=/`;
                navigate('/');
            } else if (response.status === 401) {
                setError("Incorrect username or password");
            } else if (response.status === 404) {
                setError("User not found");
            } else if (response.status === 500) {
                setError("Server error");
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while logging in');
        }
    }

    return (
        <div>
            <div className="header" ref={elementRef}>
                <div className="header-item"></div>
            </div>

            <div className={LoginPageStyle['login-form']} id="login-form"></div>

            <label htmlFor="username" 
                    className={LoginPageStyle['username-label']}>Login:</label>
            <input type="text" name="username" 
                    className={LoginPageStyle['username-input']} id="username"
                    onChange={e => setUsername(e.target.value)} />

            <label htmlFor="password" 
                    className={LoginPageStyle['password-label']}>Password:</label>
            <input type="password" name="password" 
                    className={LoginPageStyle['password-input']} 
                    id="password" onInput={handleInput}
                    onChange={e => setPassword(e.target.value)} />

            <input type="button" value="Log In" id="log-in-btn" 
                    className={LoginPageStyle['log-in-btn']} onClick={login} />

            {error && <div id="error" 
                        className={LoginPageStyle['error-message']}>{error}</div>}

            <Link to="/register" className={LoginPageStyle['sign-up-btn']}>Create Account</Link>

        </div>
    );
};

export default LoginPage;
