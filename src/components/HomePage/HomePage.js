import React, {useEffect, useRef } from "react";
import HomePageStyle from "./HomePage.module.css";
import HeaderImage from "../images/header_img.png";
import Vector from "../images/vector.png";
import UserAvatar from "../images/user_avatar.png";
import InstagramIcon from "../images/instagram_icon.png";
import FacebookIcon from "../images/facebook_icon.png";
import TwitterIcon from "../images/twitter_icon.png";
import BackgroundImage from "../images/background.png";
import { fixElementHeight, fixElementWidth, ifUserLoggedIn, HandleLoginClick, HandleProfileClick } from "../Utils";
import "../GlobalStyles.css";

const HomePage = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);

    const images = [
        {
            src: "https://images.pexels.com/photos/8581413/pexels-photo-8581413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "image1"
        },
        {
            src: "https://images.pexels.com/photos/4554249/pexels-photo-4554249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "image2"
        },
        {
            src: "https://images.pexels.com/photos/18784753/pexels-photo-18784753/free-photo-of-laundry-hung-over-the-street-between-townhouses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "image3"
        },
        {
            src: "https://images.pexels.com/photos/1427479/pexels-photo-1427479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "image4"
        },
        {
            src: "https://images.pexels.com/photos/3121275/pexels-photo-3121275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "image5"
        },
        {
            src: "https://images.pexels.com/photos/2252000/pexels-photo-2252000.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "image6"
        },
        {
            src: "https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "image7"
        },
        {
            src: "https://images.pexels.com/photos/6794043/pexels-photo-6794043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            alt: "image8"
        },
        {
            src: "https://images.pexels.com/photos/18762372/pexels-photo-18762372/free-photo-of-newborn-clothes-and-an-ultrasound-drying-in-the-yard.jpeg",
            alt: "image9"
        },
        {
            src: "https://www.boredpanda.com/blog/wp-content/uploads/2023/06/biggest-shock-of-marrying-into-wealthy-family24jpg-64895f8b6a04f__700.jpg",
            alt: "image10"
        }
    ]

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        async function checkLogin() {
            const username = await ifUserLoggedIn();
            if (username) {
                loggedIn.current.style.display = 'flex';
                if (username.length > 6) {
                    loggedIn.current.children[0].textContent = 'Logged in as ' + username.slice(0, 6) + '...';
                } else {
                    loggedIn.current.children[0].textContent = 'Logged in as ' + username;
                }
                fixElementWidth(loggedIn.current);
            } else {
                logInRef.current.style.display = 'flex';
                fixElementWidth(logInRef.current);
            }
        }
    
        checkLogin();
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

                <b className="men">Men</b>
                <b className="women">Women</b>
                <b className="kids">Kids</b>

                <div className="log-in-container" id="log-in-container" ref={logInRef} onClick={HandleLoginClick}>
                    <b className="log-in-text">Log In</b>
                    <img className="log-in-icon" alt="" src={Vector} />
                </div>

                <div className="logged-in-container" ref={loggedIn} onClick={HandleProfileClick}>
                    <b className="logged-in-as">Logged in as John</b>
                    <img
                        className="user-icon"
                        alt=""
                        src={UserAvatar}
                    />
                </div>
            </div>

            <div className={HomePageStyle['main-container']}>

                <img className={HomePageStyle['background-image']} alt="" src={BackgroundImage} />

                <p className={HomePageStyle['main-text']}>New Year Sale!! <br /> 28.12 </p>

                <div className={HomePageStyle['line']}></div>

                <div className={HomePageStyle['gallery']}>

                    {images.map((image, index) => (
                        <img key={index} src={image.src} alt={image.alt} />
                    ))}

                </div>

            </div>

            <div className={HomePageStyle['contacts']}>

                <b className={HomePageStyle['contacts-container']}>
                    <p className={HomePageStyle['contacts-text']}>
                        Contacts: <br />
                        +420987654321 <br />
                        garage.sale@gmail.com
                    </p>
                </b>

                <i className={HomePageStyle['address-container']}>
                    <p className={HomePageStyle['address']}>Address:<br />
                    nám. Svobody 72/8 <br />
                    602 00 Brno-střed <br />
                    Czech Republic</p>
                </i>

                <a href="https://www.instagram.com/">
                    <img
                        className={HomePageStyle['instagram-icon']}
                        alt="Instagram"
                        src={InstagramIcon}
                    />
                </a>

                <a href="https://www.facebook.com/">
                    <img
                        className={HomePageStyle['facebook-icon']}
                        alt="Facebook"
                        src={FacebookIcon}
                    />
                </a>

                <a href="https://twitter.com/">
                    <img
                        className={HomePageStyle['twitter-icon']}
                        alt="Twitter"
                        src={TwitterIcon}
                    />
                </a>
            </div>
        </div>
    );
}

export default HomePage;