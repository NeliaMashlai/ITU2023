/*
 * Project: ITU project - Garage sale website
 * @file Utils.js

 * @brief ReactJS functions used in multiple components

 * @author Maksym Podhornyi - xpodho08
 * @author Mashlai Neonila - xmashl00
*/

import InstagramIcon from "./images/instagram_icon.png";
import FacebookIcon from "./images/facebook_icon.png";
import TwitterIcon from "./images/twitter_icon.png";

// API base URL
export const API_BASE_URL = "http://localhost:8080/api/v1.0";

export const fixElementHeight = (element) => {
    if (element) {

        const computedStyle = window.getComputedStyle(element);
        element.style.height = computedStyle.height;

    }
}

export const fixElementWidth = (element) => {
    if (element) {

        const computedStyle = window.getComputedStyle(element);
        element.style.width = computedStyle.width;

    }
}

export const ifUserLoggedIn = async () => {
    const cookies = document.cookie.split(';');
    const userId = cookies.find(cookie => cookie.includes('user_id'));
    if (userId) {

        try {
            const response = await fetch("http://localhost:8080/api/v1.0/user/" + userId.split('=')[1], {
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

export const checkLogin = async (loggedInElement, logInElement) => {
    const username = await ifUserLoggedIn();
    if (username) {
        loggedInElement.current.style.display = 'flex';
        if (username.length > 6) {
            loggedInElement.current.children[0].textContent = 'Logged in as ' + username.slice(0, 6) + '...';
        } else {
            loggedInElement.current.children[0].textContent = 'Logged in as ' + username;
        }
        fixElementWidth(loggedInElement.current);
    } else {
        logInElement.current.style.display = 'flex';
        fixElementWidth(logInElement.current);

        var response = await fetch("http://localhost:8080/api/v1.0/user/unauthorized", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            console.error('Error:', response);
        }
    }
}

export const AddContact = () => {
    return (
        <div className="contacts">

            <b className='contacts-container'>
                <p className='contacts-text'>
                    Contacts: <br />
                    +420987654321 <br />
                    garage.sale@gmail.com
                </p>
            </b>

            <i className='address-container'>
                <p className='address'>Address:<br />
                nám. Svobody 72/8 <br />
                602 00 Brno-střed <br />
                Czech Republic</p>
            </i>

            <a href="https://www.instagram.com/">
                <img
                    className='instagram-icon'
                    alt="Instagram"
                    src={InstagramIcon}
                />
            </a>

            <a href="https://www.facebook.com/">
                <img
                    className='facebook-icon'
                    alt="Facebook"
                    src={FacebookIcon}
                />
            </a>

            <a href="https://twitter.com/">
                <img
                    className="twitter-icon"
                    alt="Twitter"
                    src={TwitterIcon}
                />
            </a>

        </div>
    )
}

export const AddCategories = () => {
    return (
        <div className="categories-container">
            <div class="category-item">
                <img src="https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg" alt="Clothing"/>
                <div class="centered-text">Clothing</div>
            </div>
            <div class="category-item">
                <img src="https://netstorage-legit.akamaized.net/images/afee74afb4d8ea20.jpg" alt="Shoes"/>
                <div class="centered-text">Shoes</div>
            </div>
            <div class="category-item">
                <img src="https://netstorage-legit.akamaized.net/images/afee74afb4d8ea20.jpg" alt="Accessories"/>
                <div class="centered-text">Accessories</div>
            </div>
            <div class="category-item">
                <img src="https://netstorage-legit.akamaized.net/images/afee74afb4d8ea20.jpg" alt="Clothing"/>
                <div class="centered-text">Clothing</div>
            </div>
            <div class="category-item">
                <img src="https://netstorage-legit.akamaized.net/images/afee74afb4d8ea20.jpg" alt="Shoes"/>
                <div class="centered-text">Clothing</div>
            </div>
            <div class="category-item">
                <img src="https://netstorage-legit.akamaized.net/images/afee74afb4d8ea20.jpg" alt="Accessories"/>
                <div class="centered-text">Clothing</div>
            </div>
        </div>
    )
}
