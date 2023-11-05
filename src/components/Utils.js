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

        const data = {
            user_id: userId.split('=')[1]
        };

        try {
            const response = await fetch("http://localhost:8080/api/v1.0/verify", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                return true;
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


    
  