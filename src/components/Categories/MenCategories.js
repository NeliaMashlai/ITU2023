import React, {useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeaderImage from "../images/header_img.png";
import Vector from "../images/vector.png";
import UserAvatar from "../images/user_avatar.png";
import MenCategoriesStyle from "./MenCategories.module.css";
import { fixElementHeight, checkLogin, AddContact, AddCategories } from "../Utils";
import "../GlobalStyles.css";

const MenCategoryPage = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        checkLogin(loggedIn, logInRef);
    }, []);

    return (
        <div>
            <div className="header" ref={headerRef}>
                <div className="header-item"></div>
                <img
                    className="header-logo"
                    alt=""
                    src={HeaderImage}
                    id="logo"
                />

                <Link to = "/men" className="men">Men</Link>
                <b className="women">Women</b>
                <b className="kids">Kids</b>

                <Link className="log-in-container" id="log-in-container" ref={logInRef} to = "/login">
                    <b className="log-in-text">Log In</b>
                    <img className="log-in-icon" alt="" src={Vector} />
                </Link>

                <Link className="logged-in-container" ref={loggedIn} to="/profile">
                    <b className="logged-in-as">Logged in as John</b>
                    <img
                        className="user-icon"
                        alt=""
                        src={UserAvatar}
                    />
                </Link>
            </div>
            
            <div className={MenCategoriesStyle['main-container']}>
                <div className={MenCategoriesStyle['categories']}>Categories</div>

                {AddCategories()}
            </div>

            {AddContact()}
        </div>
    );
}

export default MenCategoryPage;