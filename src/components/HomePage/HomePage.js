/*
 * Project: ITU project - Garage sale website
 * @file HomePage.js

 * @brief ReactJS component of the main page of the website

 * @author Neonila Mashlai - xmashl00
*/

import React, {useEffect, useRef } from "react";
import HomePageStyle from "./HomePage.module.css";
import BackgroundImage from "../images/background.png";
import { HomeImages, MapImages } from "../images/ImageMaps";
import { fixElementHeight, checkLogin, AddContact, AddHeader } from "../Utils";
import "../GlobalStyles.css";

const HomePage = () => {

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

            {AddHeader(headerRef, logInRef, loggedIn)}

            <div className={HomePageStyle['main-container']}>

                <img className={HomePageStyle['background-image']} alt="" src={BackgroundImage} />

                <p className={HomePageStyle['main-text']}>New Year Sale!! <br /> 28.12 </p>

                <div className={HomePageStyle['line']}></div>

                <div className={HomePageStyle['gallery']}>
                    {MapImages(HomeImages)}
                </div>

            </div>

            {AddContact()}

        </div>
    );
}

export default HomePage;