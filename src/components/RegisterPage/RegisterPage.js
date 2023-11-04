import React, { useState } from 'react';
import RegisterPageStyle from './RegisterPage.module.css';
import '../GlobalStyles.css';

function register(){

    if (document.getElementById('password').value != document.getElementById('confirm-password').value) {
        document.getElementById('error').innerHTML = "Passwords do not match";
        return;
    }

    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    fetch("http://localhost:8080/api/v1.0/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    .then(response => {
        if (response.status == 200) {
            response.json().then(data => {
                window.location.href = "http://localhost:5001/login";
            })
        } else if (response.status == 409) {
            document.getElementById('error').innerHTML = "Username already exists";
        } else if (response.status == 500) {
            document.getElementById('error').innerHTML = "Server error";
        }
    })
}

const RegisterPage = () => {
    return (
        <div>
            <div class="register-form" id="register-form"></div>
            <label for="username" class="username-label">Email or login:</label>
            <input type="text" name="username" class="username-input" id ="username" />

            <label for="password" class="password-label">Password:</label>
            <input type="text" name="password" class="password-input" id="password" />

            <label for="password" class="password-label">Confirm password:</label>
            <input type="text" name="password" class="password-input" id="confirm-password" />

            <input type="submit" value="Create Account" id="sign-up" class="sign-up-btn" />
            <div id="error" class="error-message"></div>
        </div>
    );
}

export default RegisterPage;