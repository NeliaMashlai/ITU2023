import React, {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fixElementHeight, checkLogin, Header, GetUserInformation, API_BASE_URL } from "../Utils";
import user_svg from "../images/user.svg";
import UserPageStyles from "./UserPage.module.css";
import "../GlobalStyles.css";
import { Link, useLocation } from "react-router-dom";

const UserPage = () => {
    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    const navigate = useNavigate();

    const NameInputRef = useRef(null);
    const SurnameInputRef = useRef(null);
    const EmailInputRef = useRef(null);
    const PhoneNumberInputRef = useRef(null);
    const DateOfBirthInputRef = useRef(null);
    const AddressInputRef = useRef(null);

    const [importantMsg, setImportantMsg] = useState("");

    const[error, setError] = useState("");

    const [items, setItems] = useState([]);

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const action_id = queryParams.get('action_id');

    const createItem = (item_id, image_path, name, price) => {
        var link = "/user/edit-item?item_id=" + item_id;
        return (
            <Link key = {item_id} to = {link} className={UserPageStyles['item-container']}>
                <img src={image_path} alt="preview" className={UserPageStyles['item-image']} />
                <div className={UserPageStyles['item-name']}>{name}</div>
                <div className={UserPageStyles['item-price']}>€{price}</div>
            </Link>
        );
    }

    const setUnlock = (e) => {
        if(e.target.name === "edit-name") {
            NameInputRef.current.disabled = false;
            NameInputRef.current.focus();
        }
        else if(e.target.name === "edit-surname") {
            SurnameInputRef.current.disabled = false;
            SurnameInputRef.current.focus();
        }
        else if(e.target.name === "edit-email") {
            EmailInputRef.current.disabled = false;
            EmailInputRef.current.focus();
        }
        else if(e.target.name === "edit-phone") {
            PhoneNumberInputRef.current.disabled = false;
            PhoneNumberInputRef.current.focus();
        }
        else if(e.target.name === "edit-address") {
            AddressInputRef.current.disabled = false;
            AddressInputRef.current.focus();
        }
        else if(e.target.name === "edit-date-of-birth") {
            DateOfBirthInputRef.current.disabled = false;
            DateOfBirthInputRef.current.focus();
        }
    }

    const [UserData, setUserData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
        address: "",
        date_of_birth: "",
    });

    const handleInputChange = (e) => {
        setUserData({
            ...UserData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogOutClick = async () => {
        document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/');
    }
    
    const handleDoneClick = async () => {

        const cookies = document.cookie.split(';');

        if(!cookies){
            navigate('/login');
            return;
        }

        const userId = cookies.find(cookie => cookie.includes('user_id'));

        if(!userId){
            navigate('/login');
            return;
        }

        const data = {
            name: UserData.name,
            surname: UserData.surname,
            email: UserData.email,
            phone: UserData.phone,
            address: UserData.address,
            date_of_birth: UserData.date_of_birth,
        };
    
        try {
            const response = await fetch(API_BASE_URL + "/user/" + userId.split('=')[1] + "/update", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (response.ok) {
                NameInputRef.current.disabled = true;
                SurnameInputRef.current.disabled = true;
                EmailInputRef.current.disabled = true;
                PhoneNumberInputRef.current.disabled = true;
                AddressInputRef.current.disabled = true;
                DateOfBirthInputRef.current.disabled = true;
                setImportantMsg("User data updated successfully");
                setTimeout(() => {
                    setImportantMsg(false);
                }, 2000);  
            } else if (response.status === 409) {
                setError("Username already exists");
            } else if (response.status === 500) {
                setError("Server error");
            } else if (response.status === 400) {
                setError("Username or password cannot be empty");
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            console.error('Error:', err);
            setError("Failed to connect to the server");
        }
    };

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        checkLogin(loggedIn, logInRef).then((result) => {
            if (!result) {
                navigate('/login');
                return;
            }
            loggedIn.current.style.display = "none";
        }
        );

        GetUserInformation().then((user) => {
            if(!user) {
                navigate('/login');
                return;
            } else {
                const updatedUserData = {
                    name: user.name ?? "",
                    surname: user.surname ?? "",
                    email: user.email ?? "",
                    phone: user.phone ?? "",
                    address: user.address ?? "",
                    date_of_birth: user.date_of_birth ?? "",
                };
        
                setUserData(updatedUserData);

            }
        }
        );  

        const cookies = document.cookie.split(';');

        if(!cookies){
            navigate('/login');
            return;
        }

        const userId = cookies.find(cookie => cookie.includes('user_id'));

        const fetchItems = async (user_id) => {
            const response = await fetch(API_BASE_URL + "/user/" + user_id + "/items", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            for (const item of data) {
                if (item.name.length > 15) {
                    item.name = item.name.substring(0, 15) + "...";
                }
            }
            setItems(data);
        }
        
        if(userId){
            fetchItems(userId.split('=')[1]);
        } else {
            navigate('/login');
            return;
        }

        if(action_id === "add"){
            setImportantMsg("Item added successfully");
        } else if(action_id === "edit"){
            setImportantMsg("Item edited successfully");
        } else if(action_id === "delete"){
            setImportantMsg("Item deleted successfully");
        }

        const timer = setTimeout(() => {
            setImportantMsg(false);
        }, 2000);  

        const interval = setInterval(() => {
            fetchItems(userId.split('=')[1]);
        }
        , 3000);

        return () => clearInterval(interval, timer);
    }
    , [navigate, action_id]);

    return(

        <div>

            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />

            <div className={UserPageStyles["main-container"]} >

                <img src={user_svg} alt="Upload" className={UserPageStyles["user-image"]} />


                <div className={UserPageStyles["name-input-container"]}>
                    <label htmlFor="name" className={UserPageStyles["name-label"]}
                    value = {UserData.name} onChange={handleInputChange}>Name:</label>
                    <input type="text" name="name" className={UserPageStyles["name-input"]} id="name" 
                    placeholder="set name" value = {UserData.name} onChange = {handleInputChange} ref={NameInputRef} disabled/>
                    <input type="button" value="EDIT" name = "edit-name" className={UserPageStyles["edit-name-button"]} onClick = {setUnlock} />
                </div>

                <div className={UserPageStyles["surname-input-container"]}>
                    <label htmlFor="surname" className={UserPageStyles["surname-label"]}
                    value = {UserData.surname} onChange={handleInputChange}>Surname:</label>
                    <input type="text" name="surname" className={UserPageStyles["surname-input"]} id="surname" 
                    placeholder="set surname" value = {UserData.surname} onChange = {handleInputChange} ref={SurnameInputRef} disabled/>
                    <input type="button" value="EDIT" name = "edit-surname" className={UserPageStyles["edit-surname-button"]} onClick = {setUnlock} />
                </div>

                <div className={UserPageStyles["email-input-container"]}>
                    <label htmlFor="email" className={UserPageStyles["email-label"]}
                    value = {UserData.email} onChange={handleInputChange}>E-mail:</label>
                    <input type="email" name="email" className={UserPageStyles["email-input"]} id="email" 
                    placeholder="set email" value = {UserData.email} onChange = {handleInputChange} ref={EmailInputRef} disabled/>
                    <input type="button" value="EDIT" name = "edit-email" className={UserPageStyles["edit-email-button"]} onClick = {setUnlock} />
                </div>

                <div className={UserPageStyles["phone-input-container"]}>
                    <label htmlFor="phone" className={UserPageStyles["phone-label"]}
                    value = {UserData.phone} onChange={handleInputChange}>Phone number:</label>
                    <input type="tel" name="phone" className={UserPageStyles["phone-input"]} id="phone" 
                    placeholder="set phone number" value = {UserData.phone} onChange = {handleInputChange} ref={PhoneNumberInputRef} disabled/>
                    <input type="button" value="EDIT" name = "edit-phone" className={UserPageStyles["edit-phone-button"]} onClick = {setUnlock} />
                </div>

                <div className={UserPageStyles["address-input-container"]}>
                    <label htmlFor="address" className={UserPageStyles["address-label"]}
                    value = {UserData.address} onChange={handleInputChange}>Address:</label>
                    <input type="text" name="address" className={UserPageStyles["address-input"]} id="address" 
                    placeholder="set address" value = {UserData.address} onChange = {handleInputChange} ref={AddressInputRef} disabled/>
                    <input type="button" value="EDIT" name = "edit-address" className={UserPageStyles["edit-address-button"]} onClick = {setUnlock} />
                </div>

                <div className={UserPageStyles["date_of_birth-input-container"]}>
                    <label htmlFor="date_of_birth" className={UserPageStyles["date_of_birth-label"]}
                    value = {UserData.date_of_birth} onChange={handleInputChange}>Date of birth:</label>
                    <input type="date" name="date_of_birth" className={UserPageStyles["date_of_birth-input"]} id="date_of_birth" 
                    placeholder="set date of birth" value = {UserData.date_of_birth} onChange = {handleInputChange} ref={DateOfBirthInputRef} disabled/>
                    <input type="button" value="EDIT" name = "edit-date-of-birth" className={UserPageStyles["edit-date-of-birth-button"]} onClick = {setUnlock} />
                </div>

                <div className={UserPageStyles["full-height-line"]}></div>

                <div className={UserPageStyles["user-items-label"]}>My items for sale</div>

                <div className={UserPageStyles["user-items-container"]}>
                    {items.map(item => createItem(item.id, item.image_path, item.name, item.price))}
                </div>

                <input type="submit" value="DONE" className={UserPageStyles["submit-button"]} onClick = {handleDoneClick} />
                <input type="submit" value="Log out" className={UserPageStyles["log-out-button"]} onClick = {handleLogOutClick} />
                <Link to = "/user/add-item" className={UserPageStyles["add-item-button"]}>ADD ITEM</Link>
                <Link to = "/user/chats" className={UserPageStyles["chat-button"]}>CHATS</Link>

                {importantMsg && <div className={UserPageStyles["important-message"]}>{importantMsg}</div>}

                {error && <div id="error" className={UserPageStyles['error']}>{error}</div>}


            </div>

        </div>
    );
}
export default UserPage;