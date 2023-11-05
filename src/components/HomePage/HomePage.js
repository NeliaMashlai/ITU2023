import React, {useEffect, useRef } from "react";
import HomePageStyle from "./HomePage.module.css";
import HeaderImage from "../images/header_img.png";
import Vector from "../images/vector.png";
import UserAvatar from "../images/user_avatar.png";
import { fixElementHeight, fixElementWidth } from "../Utils";
import "../GlobalStyles.css";

const HomePage = () => {

    const elementRef = useRef(null);
    const elementRef2 = useRef(null);

    useEffect(() => {
        if (elementRef.current) {
            fixElementHeight(elementRef.current);
            fixElementWidth(elementRef2.current);
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

                {/* <div className={HomePageStyle['log-in']} id="logInContainer" ref={elementRef2}>
                    <b className={HomePageStyle['log-in-text']}>Log In</b>
                    <img className={HomePageStyle['log-in-icon']} alt="" src={Vector} />
                </div> */}

                <div className="logged-in-container">
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