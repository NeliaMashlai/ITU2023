import React, {useEffect, useRef } from "react";
import HomePageStyle from "./HomePage.module.css";
import HeaderImage from "../images/header_img.png";
import Vector from "../images/vector.png";
import UserAvatar from "../images/user_avatar.png";
import { fixElementHeight, fixElementWidth, ifUserLoggedIn } from "../Utils";
import "../GlobalStyles.css";

const HomePage = () => {

    const elementRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);

    useEffect(() => {
        if (elementRef.current) {
            fixElementHeight(elementRef.current);
            fixElementWidth(logInRef.current);
            fixElementWidth(loggedIn.current);
        }

        if (ifUserLoggedIn()) {
            loggedIn.current.style.display = 'flex';
        } else {
            logInRef.current.style.display = 'flex';
        }
    }, []);

    return (
        <div>
            <div className="header" ref={elementRef}>
                <div className="header-item"></div>
                <img
                    className="header-logo"
                    alt=""
                    src={HeaderImage}
                    id="logo"
                />

                <b className="men">Men</b>
                <b className="women">Women</b>
                <b className="kids">Kids</b>

                <div className={HomePageStyle['log-in-container']} id="log-in-container" ref={logInRef}>
                    <b className={HomePageStyle['log-in-text']}>Log In</b>
                    <img className={HomePageStyle['log-in-icon']} alt="" src={Vector} />
                </div>

                <div className={HomePageStyle['logged-in-container']} ref={loggedIn}>
                    <b className={HomePageStyle['logged-in-as']}>Logged in as John</b>
                    <img
                        className={HomePageStyle['icon-user-avatar-icon']}
                        alt=""
                        src={UserAvatar}
                    />
                </div>
            </div>
        </div>
    );
}

export default HomePage;