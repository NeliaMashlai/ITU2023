/*
 * Project: ITU project - Garage sale website
 * @file Utils.js

 * @brief ReactJS functions used in multiple components

 * @author Maksym Podhornyi - xpodho08
 * @author Mashlai Neonila - xmashl00
*/

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

export const HandleLoginClick = async () => {
    window.location.href = "http://localhost:3000/login";
}

export const HandleProfileClick = async () => {
    window.location.href = "http://localhost:3000/user";
}
    
  