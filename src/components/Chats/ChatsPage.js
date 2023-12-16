import React, {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fixElementHeight, checkLogin, Header, API_BASE_URL, GetItem } from "../Utils";
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
    const chatHeader = useRef(null);

    const [chats, setChats] = useState([]);

    const addChat = (username, item_name, chat_id, item_id) => {
        return (
            <div className={ChatsPageStyles['one-chat-container']} key = {chat_id} onClick={openChat} id = {chat_id}
            value = {item_id}>
                <img src={user_svg} alt="Upload" className={ChatsPageStyles["chat-user-image"]}/>
                <span className={ChatsPageStyles["user-id-label"]}>User: {username}</span>
                <span className={ChatsPageStyles["item-id-label"]}>Item: {item_name}</span>
            </div>
        );
    }

    const openChat = async(event) => {
        var chat_id;
        var item_id;

        if(event.target.className === ChatsPageStyles['one-chat-container']) {
            chat_id = event.target.id;
            item_id = event.target.getAttribute('value');
        } else {
            chat_id = event.target.parentNode.id;
            item_id = event.target.parentNode.getAttribute('value');
        }
        
        GetItem(item_id).then((item) => {
            chatHeader.current.innerHTML = "Item: " + item.name;
        }
        );

    }

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

        const fetchChats = async () => {
            const cookies = document.cookie.split(';');
            if (!cookies) {
                navigate('/login');
                return;
            }

            const user = cookies.find(cookie => cookie.includes('user_id'));

            if(!user) {
                navigate('/login');
                return;
            }

            const response = await fetch(API_BASE_URL + "/user/" + user.split('=')[1] + "/chats", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            const chats = [];
            for (const chat of data) {
                const item = await GetItem(chat.item_id);
                // if item name more than 20 characters, truncate it
                if (item.name.length > 15) {
                    item.name = item.name.substring(0, 15) + "...";
                }
                if (parseInt(user.split('=')[1]) === parseInt(chat.user_to)) {
                    const user = await fetch(API_BASE_URL + "/user/" + chat.user_from, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    const userData = await user.json();
                    if (userData.username.length > 12) {
                        userData.username = userData.username.substring(0, 12) + "...";
                    }
                    chats.push({username: userData.username, item_name: item.name, item_id: chat.item_id, chat_id: chat.chat_id});
                } else {
                    const user = await fetch(API_BASE_URL + "/user/" + chat.user_to, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    });
                    const userData = await user.json();
                    if (userData.username.length > 12) {
                        userData.username = userData.username.substring(0, 12) + "...";
                    }
                    chats.push({username: userData.username, item_name: item.name, item_id: chat.item_id, chat_id: chat.chat_id});
                }
            }

            console.log(chats);
            setChats(chats);
        }

        fetchChats();
        
    }
    , [navigate]);

    return(

        <div>
            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />

            <div className={ChatsPageStyles['main-container']}>

                <div className={ChatsPageStyles['caption-container']}>
                        <p className={ChatsPageStyles['caption']}>YOUR CHATS<br /> </p>
                </div>

                <div className={ChatsPageStyles['chats-container']} ref = {chatsRef}>

                    {chats.map(chat => addChat(chat.username, chat.item_name, chat.chat_id, chat.item_id))}

                </div>

                <div className={ChatsPageStyles['each-chat-container']}>
                    <div className={ChatsPageStyles['each-chat-header']} ></div>
                        <img src={user_svg} alt="Upload" className={ChatsPageStyles["chat-item-image"]} />
                        <span className={ChatsPageStyles["item-id-header"]} ref = {chatHeader}>Item: [ItemID]</span>
                </div>
            </div>
        </div>
    );

}
export default ChatsPage;