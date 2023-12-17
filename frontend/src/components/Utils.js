/*
 * Project: ITU project - Garage sale website
 * @file Utils.js

 * @brief ReactJS functions used in multiple components

 * @author Maksym Podhornyi - xpodho08
 * @author Mashlai Neonila - xmashl00
*/

/*
 * Project: ITU project - Garage sale website
 * @file Utils.js
 * @brief ReactJS functions used in multiple components
 *        This file contains utility functions and components shared across the project.
 * @author Maksym Podhornyi - xpodho08
 * @author Mashlai Neonila - xmashl00
*/

// Importing assets and necessary libraries.
import InstagramIcon from "./images/instagram_icon.png";
import FacebookIcon from "./images/facebook_icon.png";
import TwitterIcon from "./images/twitter_icon.png";
import HeaderImage from "./images/header_img.png";
import Vector from "./images/vector.png";
import UserAvatar from "./images/user_avatar.png";
import { Link } from "react-router-dom";
import React, { forwardRef } from "react";

// API base URL constant for server requests.
export const API_BASE_URL = "http://localhost:8080/api/v1.0";

// Function to fix the height of an element based on its computed style.
export const fixElementHeight = (element) => {
    if (element) {
        const computedStyle = window.getComputedStyle(element);
        element.style.height = computedStyle.height;
    }
}

// Similar function for fixing the width of an element.
export const fixElementWidth = (element) => {
    if (element) {
        const computedStyle = window.getComputedStyle(element);
        element.style.width = computedStyle.width;
    }
}

// Function to check if a user is logged in by examining cookies.
export const ifUserLoggedIn = async () => {
    const cookies = document.cookie.split(';');
    if (!cookies) {
        return false;
    }
    const userId = cookies.find(cookie => cookie.includes('user_id'));
    if (userId) {
        try {
            // Fetching user data from the server.
            const response = await fetch(API_BASE_URL + "/user/" + userId.split('=')[1], {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                const userData = await response.json();
                return userData.username;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }
    return false;
}

// Function to handle user login state in the UI.
export const checkLogin = async (loggedInElement, logInElement) => {
    if (!loggedInElement.current || !logInElement.current) {
        return;
    }
    const username = await ifUserLoggedIn();
    if (username) {
        // Handling UI changes based on user login state.
        loggedInElement.current.style.display = 'flex';
        loggedInElement.current.children[0].textContent = username.length > 6 ?
            'Logged in as ' + username.slice(0, 6) + '...' :
            'Logged in as ' + username;
        fixElementWidth(loggedInElement.current);
        return true;
    } else {
        logInElement.current.style.display = 'flex';
        fixElementWidth(logInElement.current);

        // Informing the server about unauthorized access.
        var response = await fetch(API_BASE_URL + "/user/unauthorized", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            console.error('Error:', response);
        }
        return false;
    }
}

// Contacts component using forwardRef for better reusability and reference passing.
export const Contacts = forwardRef((props, ref) => {
    return (
        // Social media contacts and address information for the website
        <div className="contacts">
            <b className='contacts-container'>
                {/* Contact information */}
                <p className='contacts-text'>
                    Contacts: <br />
                    +420987654321 <br />
                    garage.sale@gmail.com
                </p>
            </b>

            <i className='address-container'>
                {/* Physical address details */}
                <p className='address'>Address:<br />
                nám. Svobody 72/8 <br />
                602 00 Brno-střed <br />
                Czech Republic</p>
            </i>

            {/* Social media icons with links */}
            <a href="https://www.instagram.com/">
                <img className='instagram-icon' alt="Instagram" src={InstagramIcon} />
            </a>
            <a href="https://www.facebook.com/">
                <img className='facebook-icon' alt="Facebook" src={FacebookIcon} />
            </a>
            <a href="https://twitter.com/">
                <img className="twitter-icon" alt="Twitter" src={TwitterIcon} />
            </a>
        </div>
    )
})

// Header component with navigation and user login state handling.
export const Header = forwardRef((props, ref) => {
    const { headerRef, logInRef, loggedIn } = props;
    return (
        // Website header with navigation links and user login/logout status
        <div className="header" ref={headerRef}>
            <div className="header-item"></div>
            {/* Navigation links to different sections of the site */}
            <Link to="/" className="home">
                <img className="header-logo" alt="" src={HeaderImage} id="logo" />
            </Link>
            <Link to="/men" className="men">Men</Link>
            <Link to="/women" className="women">Women</Link>
            <Link to="/kids" className="kids">Kids</Link>

            {/* Log in/out buttons and user information display */}
            <Link className="log-in-container" id="log-in-container" ref={logInRef} to="/login">
                <b className="log-in-text">Log In</b>
                <img className="log-in-icon" alt="" src={Vector} />
            </Link>
            <Link className="logged-in-container" ref={loggedIn} to="/profile">
                <b className="logged-in-as">Logged in as John</b>
                <img className="user-icon" alt="" src={UserAvatar} />
            </Link>
        </div>
    )
})

// Function to upload an image to the server.
export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);
    try {
        // POST request to upload the image.
        const response = await fetch(API_BASE_URL + "/image/upload", {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const imageId = await response.json();
            return imageId;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// Function to retrieve user information based on stored cookies.
export const GetUserInformation = async () => {
    const cookies = document.cookie.split(';');
    if (!cookies) {
        return false;
    }
    const userId = cookies.find(cookie => cookie.includes('user_id'));
    if (!userId) {
        return false;
    }
    try {
        // Fetching user data from the server.
        const response = await fetch(API_BASE_URL + "/user/" + userId.split('=')[1], {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// Function to retrieve a specific item details from the server.
export const GetItem = async (item_id) => {
    try {
        // GET request to fetch item details.
        const response = await fetch(API_BASE_URL + "/items/" + item_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const items = await response.json();
            return items;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
