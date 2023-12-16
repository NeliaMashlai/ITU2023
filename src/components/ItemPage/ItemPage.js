import React, {useEffect, useRef, useState } from "react";
import ItemPageStyle from "./ItemPage.module.css";
import { fixElementHeight, checkLogin, Contacts, Header, GetItem, API_BASE_URL } from "../Utils";
import "../GlobalStyles.css";
import { useNavigate, useLocation } from "react-router-dom";

const ItemPage = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    const contactRef = useRef(null);

    const [ItemName, setItemName] = useState("");
    const [ItemSize, setItemSize] = useState("");
    const [ItemCondition, setItemCondition] = useState("");
    const [ItemDescription, setItemDescription] = useState("");
    const [ItemPrice, setItemPrice] = useState("");
    const [ItemImage, setItemImage] = useState("");
    const [ItemSeller, setItemSeller] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const item_id = queryParams.get('item_id');

    const CreateChat = async () => {
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

        const data = {
            item_id: item_id,
            user_to: ItemSeller,
            user_from: user.split('=')[1]
        };

        if (parseInt(user.split('=')[1]) === parseInt(ItemSeller)) {
            navigate('/profile');
            return;
        }

        try {
            const response = await fetch(API_BASE_URL + "/chat/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const chatData = await response.json();
                navigate('/user/chats?chat_id=' + chatData + '&item_id=' + item_id);
            } else if (response.status === 401) {
                navigate('/login');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }

        GetItem(item_id).then((item) => {
            if(!item) {
                navigate('*');
                return;
            }
            setItemName(item.name);
            setItemSize(item.size);
            if(item.condition_id === "new") {
                setItemCondition("Brand new");
            } else if(item.condition_id === "likeNew") {
                setItemCondition("Like new");
            }
            else if(item.condition_id === "gentlyUsed") {
                setItemCondition("Gently used");
            }
            else if(item.condition_id === "used") {
                setItemCondition("Used");
            }
            else if(item.condition_id === "vintage") {
                setItemCondition("Vintage or retro");
            }
            else if(item.condition_id === "forParts") {
                setItemCondition("For parts or repair");
            }
            setItemDescription(item.description);
            setItemPrice(item.price);
            setItemImage(item.image_path);
            setItemSeller(item.author_id);
        });
    
        checkLogin(loggedIn, logInRef)

    }, [navigate, location, item_id, ItemSeller]);

    return (
        <div>

            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />

            <div className={ItemPageStyle["main-container"]} >
                <div  className={ItemPageStyle['image-container']} >
                    <img src={ItemImage} alt="Preview" className={ItemPageStyle["image-preview"]}/>
                </div>

                <div className={ItemPageStyle["item-price"]}>Price: €{ItemPrice}</div>

                <div className={ItemPageStyle["item-name"]}>
                    Name:<br />
                    {ItemName}
                </div>

                <div className={ItemPageStyle["item-size"]}>
                    Size: <br />
                    {ItemSize}
                </div>

                <div className={ItemPageStyle["item-condition"]}>
                    Condition: <br />
                    {ItemCondition}
                </div>

                <div className={ItemPageStyle["item-description-container"]}>
                    <div className={ItemPageStyle["item-description-label"]}>Description:</div>
                    <div className={ItemPageStyle["item-description"]}>
                        {ItemDescription}
                    </div>
                </div>
 
                <input type = "submit" className={ItemPageStyle["contact-seller-button"]} ref = {contactRef}
                onClick={CreateChat} value = "Contact seller" />

            </div>

            <Contacts />

        </div>
    );
}

export default ItemPage;