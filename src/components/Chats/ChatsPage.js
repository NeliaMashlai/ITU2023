import React, {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fixElementHeight, checkLogin, Header } from "../Utils";
import user_svg from "../images/user.svg";
import ChatsPageStyles from "./ChatsPage.module.css";
import "../GlobalStyles.css";
import { Link } from "react-router-dom";

const ChatsPage = () => {
    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    const navigate = useNavigate();

    const chatsRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        if (headerRef.current && logInRef.current && loggedIn.current) {
            checkLogin(loggedIn, logInRef).then((result) => {
                if (!result) {
                    navigate('/login');
                }
            }
            );
        } else {
            setTimeout(() => {
                checkLogin(loggedIn, logInRef).then((result) => {
                    if (!result) {
                        navigate('/login');
                    }
                }
                );
            }, 100);
        }
        
    }
    , [navigate]);

    return(

        <div>
            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />

            <div className={ChatsPageStyles['main-container']}>

                <div className={ChatsPageStyles['chats-container']} ref = {chatsRef}>

                    <div className={ChatsPageStyles['caption-container']}>
                        <p className={ChatsPageStyles['caption']}>YOUR CHATS<br /> </p>
                    </div>

                    <div className={ChatsPageStyles['one-chat-container']}>
                        <img src={user_svg} alt="Upload" className={ChatsPageStyles["chat-user-image"]} />
                    </div>

                    <div className={ChatsPageStyles['one-chat-container']}>
                        <img src={user_svg} alt="Upload" className={ChatsPageStyles["chat-user-image"]} />
                    </div>

                    <div className={ChatsPageStyles['one-chat-container']}>
                        <img src={user_svg} alt="Upload" className={ChatsPageStyles["chat-user-image"]} />
                    </div>

                    <div className={ChatsPageStyles['one-chat-container']}>
                        <img src={user_svg} alt="Upload" className={ChatsPageStyles["chat-user-image"]} />
                    </div>

                    <div className={ChatsPageStyles['one-chat-container']}>
                        <img src={user_svg} alt="Upload" className={ChatsPageStyles["chat-user-image"]} />
                    </div>
                </div>

                <div className={ChatsPageStyles['each-chat-container']}>
                    
                </div>

            </div>
        </div>
    );

}
export default ChatsPage;