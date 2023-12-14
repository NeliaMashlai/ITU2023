import React, {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fixElementHeight, AddContact, checkLogin, AddHeader, uploadImage, GetUserInformation, API_BASE_URL } from "../Utils";
import user_svg from "../images/user.svg";
import UserPageStyles from "./UserPage.module.css";
import "../GlobalStyles.css";
import { Link } from "react-router-dom";

const UserPage = () => {
    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    const uploadContainerRef = useRef(null);
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

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


    const handleClick = () => {
        fileInputRef.current.click();
    };



    const data = {
        name: UserData.name,
        surname: UserData.surname,
        email: UserData.email,
        phone: UserData.phone,
        address: UserData.address,
        date_of_birth: UserData.date_of_birth,
    };

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        checkLogin(loggedIn, logInRef).then((result) => {
            if (!result) {
                navigate('/login');
            }
        }
        );
        
    }
    , [navigate]);

    return(

        <div>

            {AddHeader(headerRef, logInRef, loggedIn)}

            <div className={UserPageStyles["main-container"]} >

                <img src={user_svg} alt="Upload" className={UserPageStyles["user-image"]} />


                <div className={UserPageStyles["name-input-container"]}>
                    <label htmlFor="name" className={UserPageStyles["name-label"]}
                    value = {UserData.name} onChange={handleInputChange}>Name:</label>
                    <input type="text" name="name" className={UserPageStyles["name-input"]} id="name" 
                    placeholder="set name" value = {UserData.name} onChange = {handleInputChange}/>
                </div>

                <div className={UserPageStyles["surname-input-container"]}>
                    <label htmlFor="surname" className={UserPageStyles["surname-label"]}
                    value = {UserData.surname} onChange={handleInputChange}>Surname:</label>
                    <input type="text" name="surname" className={UserPageStyles["surname-input"]} id="surname" 
                    placeholder="set surname" value = {UserData.surname} onChange = {handleInputChange}/>
                </div>

                <div className={UserPageStyles["email-input-container"]}>
                    <label htmlFor="email" className={UserPageStyles["email-label"]}
                    value = {UserData.email} onChange={handleInputChange}>E-mail:</label>
                    <input type="email" name="email" className={UserPageStyles["email-input"]} id="email" 
                    placeholder="set email" value = {UserData.email} onChange = {handleInputChange}/>
                </div>

                <div className={UserPageStyles["phone-input-container"]}>
                    <label htmlFor="phone" className={UserPageStyles["phone-label"]}
                    value = {UserData.phone} onChange={handleInputChange}>Phone number:</label>
                    <input type="tel" name="phone" className={UserPageStyles["phone-input"]} id="phone" 
                    placeholder="set phone number" value = {UserData.phone} onChange = {handleInputChange}/>
                </div>

                <div className={UserPageStyles["address-input-container"]}>
                    <label htmlFor="address" className={UserPageStyles["address-label"]}
                    value = {UserData.address} onChange={handleInputChange}>Address:</label>
                    <input type="text" name="address" className={UserPageStyles["address-input"]} id="address" 
                    placeholder="set address" value = {UserData.address} onChange = {handleInputChange}/>
                </div>

                <div className={UserPageStyles["date_of_birth-input-container"]}>
                    <label htmlFor="date_of_birth" className={UserPageStyles["date_of_birth-label"]}
                    value = {UserData.date_of_birth} onChange={handleInputChange}>Date of birth:</label>
                    <input type="date" name="date_of_birth" className={UserPageStyles["date_of_birth-input"]} id="date_of_birth" 
                    placeholder="set date of birth" value = {UserData.date_of_birth} onChange = {handleInputChange}/>
                </div>

                <div className={UserPageStyles["full-height-line"]}></div>

                {/* <input type="submit" value="DONE" className={UserPageStyles["submit-button"]} onClick = {Updateuser} /> */}
                <Link to = "/user/add-item" className={UserPageStyles["add-item-button"]}>ADD ITEM</Link>
                <Link to = "/user/chats" className={UserPageStyles["chat-button"]}>CHATS</Link>


            </div>

        </div>
    );
}
export default UserPage;