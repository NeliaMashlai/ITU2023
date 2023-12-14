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

        </div>
    );

}
export default ChatsPage;