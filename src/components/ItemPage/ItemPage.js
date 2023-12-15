import React, {useEffect, useRef, useState } from "react";
import ItemPageStyle from "./ItemPage.module.css";
import { fixElementHeight, checkLogin, Contacts, Header, GetItem } from "../Utils";
import "../GlobalStyles.css";
import { Link, useNavigate } from "react-router-dom";

const ItemPage = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);

    const [ItemName, setItemName] = useState("");
    const [ItemSize, setItemSize] = useState("");
    const [ItemCondition, setItemCondition] = useState("");
    const [ItemDescription, setItemDescription] = useState("");
    const [ItemPrice, setItemPrice] = useState("");
    const [ItemImage, setItemImage] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }

        GetItem("1").then((item) => {
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
        });
    
        checkLogin(loggedIn, logInRef);
    }, [navigate]);

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
 
                <Link to = "/user/chats" className={ItemPageStyle["contact-seller-button"]}>Contact seller</Link>

            </div>

            <Contacts />

        </div>
    );
}

export default ItemPage;