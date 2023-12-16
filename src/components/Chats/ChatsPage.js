import React, {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fixElementHeight, checkLogin, Header, API_BASE_URL, GetItem } from "../Utils";
import user_svg from "../images/user.svg";
import ChatsPageStyles from "./ChatsPage.module.css";
import sendIcon from "../images/ArrowCircleRight.svg";
import "../GlobalStyles.css";

const ChatsPage = () => {
    // TODO: Add chat functionality(messages)
    // TODO: Add chat categories(buy, sell)
    // TODO: delete chats
    // TODO: add functionality in chats
    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    const navigate = useNavigate();

    const chatsRef = useRef(null);
    const chatHeader = useRef(null);
    const chatImage = useRef(null);

    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [message, getMessage] = useState("");

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

    const addMessage = (message, isMine, id) => {
        const cookie = document.cookie.split(';').find(cookie => cookie.includes('user_id')).split('=')[1];
        if (parseInt(isMine) === parseInt(cookie)) {
            return (
                <div className={ChatsPageStyles['each-chat-message-container-mine']} key = {id}>
                    <span className={ChatsPageStyles['each-chat-message']}>{message}</span>
                </div>
            );
        } else {
            return (
                <div className={ChatsPageStyles['each-chat-message-container-yours']} key = {id}>
                    <span className={ChatsPageStyles['each-chat-message']}>{message}</span>
                </div>
            );
        }
    }

    const setMessage = (event) => {
        getMessage(event.target.value);
    }

    const handleSent = async() => {
        const user_from = document.cookie.split(';').find(cookie => cookie.includes('user_id')).split('=')[1];
        const chat_id = chatHeader.current.value;
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const data = {
            message: message,
            user_from: user_from,
            date: timestamp,
            chat_id: chat_id
        }

        const response = await fetch(API_BASE_URL + "/message/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
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
        
        await GetItem(item_id).then((item) => {
            if (item.name.length > 30) {
                item.name = item.name.substring(0, 30) + "...";
            }
            chatHeader.current.innerHTML = item.name;
            chatHeader.current.value = chat_id;

            if (item.image_path) {
                chatImage.current.src = item.image_path;
            }
        }
        );

        await fetchMessages(chat_id);

        setInterval(() => {
            fetchMessages(chat_id);
        }, 1000);

    }

    const fetchMessages = async(chat_id) => {
        const response = await fetch(API_BASE_URL + "/chat/" + chat_id + "/messages", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        const messages = [];
        for (const message of data) {
            messages.push({message: message.message, user_from: message.user_from, id: message.message_id});
        }

        setMessages(messages.reverse());
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
                    <div className={ChatsPageStyles['each-chat-header']} >
                        <img src={user_svg} alt="Upload" className={ChatsPageStyles["chat-item-image"]} ref = {chatImage} />
                        <span className={ChatsPageStyles["item-id-header"]} ref = {chatHeader}></span>
                    </div>
                    <div className={ChatsPageStyles['each-chat-messages']}>
                        {messages.map(message => addMessage(message.message, message.user_from, message.id))}
                    </div>
                    <div className={ChatsPageStyles['each-chat-input-container']}>
                        <input type="text" className={ChatsPageStyles['each-chat-input']} placeholder="Type a message..." onChange={setMessage} />
                        <img src={sendIcon} alt="sent" className={ChatsPageStyles["send-icon"]} onClick={handleSent} />
                    </div>
                </div>
            </div>
        </div>
    );

}
export default ChatsPage;