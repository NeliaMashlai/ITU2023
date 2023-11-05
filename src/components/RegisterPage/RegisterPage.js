import React, { useState } from 'react';
import RegisterPageStyle from './RegisterPage.module.css';
import '../GlobalStyles.css';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
    
        const data = {
          username: username,
          password: password,
        };
    
        try {
          const response = await fetch("http://localhost:8080/api/v1.0/register", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
    
          if (response.ok) {
            window.location.href = "http://localhost:3000/login";
          } else if (response.status === 409) {
            setError("Username already exists");
          } else {
            setError("Server error");
          }
        } catch (err) {
          setError("Failed to connect to the server");
        }
    };

    return (
        <div>

            {/* <div className="header">
                <div className="header-item"></div>
            </div> */}

            <div className={RegisterPageStyle['register-form']}></div>

            <label for="username" className={RegisterPageStyle['username-label']}>Login:</label>
            <input type="text" name="username" className={RegisterPageStyle['username-input']}
                    onChange={e => setUsername(e.target.value)} />

            <label for="password" className={RegisterPageStyle['password-label']}>Password:</label>
            <input type="text" name="password" className={RegisterPageStyle['password-input']}
                    onChange={e => setPassword(e.target.value)} />

            <label for="password" className={RegisterPageStyle['password-label1']}>Confirm password:</label>
            <input type="text" name="password" className={RegisterPageStyle['password-input1']}
                    onChange={e => setConfirmPassword(e.target.value)} />

            <input type="submit" value="Create Account" className={RegisterPageStyle['sign-up-btn']}
                    onClick={handleRegister} />
                    
            {/* add error styles */}
            {error && <div>{error}</div>}
        </div>
    );
}

export default RegisterPage;