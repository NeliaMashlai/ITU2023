import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header, checkLogin, fixElementHeight, API_BASE_URL } from '../Utils';
import ItemsListStyles from './ItemsList.module.css';
import InstagramIcon from '../images/instagram_icon.png';
import FacebookIcon from '../images/facebook_icon.png';
import TwitterIcon from '../images/twitter_icon.png';
import '../GlobalStyles.css';

const ItemsList = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    
    const itemsContainerRef = useRef(null);
    const captionRef = useRef(null);
    const contactsRef = useRef(null);

    const [items, setItems] = useState([]);

    const location = useLocation();

    const addItem = (item_id, image_path, name, price) => {
        var link = "/item?item_id=" + item_id;
        return (
            <Link key = {item_id} to = {link} className={ItemsListStyles['item-container']}>
                <img src={image_path} alt="preview" className={ItemsListStyles['item-image']} />
                <div className={ItemsListStyles['item-name']}>{name}</div>
                <div className={ItemsListStyles['item-price']}>€{price}</div>
            </Link>
        );
    }

    const fetchItems = async (category_id) => {
        const response = await fetch(API_BASE_URL + "/items/" + category_id + "/category", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();

        if(data.length <= 4){
            contactsRef.current.style.position = "absolute";
            contactsRef.current.style.bottom = "0";
        } else {
            contactsRef.current.style.position = "relative";
        }

        setItems(data);
    }

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        checkLogin(loggedIn, logInRef);

        const queryParams = new URLSearchParams(location.search);
        const categoryId = queryParams.get('categoryId');

        if(categoryId.includes("women")) {
            headerRef.current.childNodes[3].style.borderBottom = "2px solid var(--blue)";
            captionRef.current.textContent = categoryId.replace("women", "")
        } else if (categoryId.includes("men")){
            headerRef.current.childNodes[2].style.borderBottom = "2px solid var(--blue)";
            captionRef.current.textContent = categoryId.replace("men", "")
        } else if (categoryId.includes("kids")){
            headerRef.current.childNodes[4].style.borderBottom = "2px solid var(--blue)";
            captionRef.current.textContent = categoryId.replace("kids", "")
        }

        fetchItems(categoryId);
        
        const interval = setInterval(() => {
            fetchItems(categoryId);
        }, 3000); 

        return () => clearInterval(interval);
    }
    , [location]);

    return (
        <div>

            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />

            <div className={ItemsListStyles['main-container']}>

                <div className={ItemsListStyles['caption']} ref = {captionRef}>Men : Clothing</div>

                <div className={ItemsListStyles['items-container']} ref = {itemsContainerRef}>

                    {items.map(item => addItem(item.id, item.image_path, item.name, item.price))}

                </div>

                <div className={ItemsListStyles['contacts']} ref = {contactsRef}>
                    <b className={ItemsListStyles['contacts-container']}>
                        <p className={ItemsListStyles['contacts-text']}>
                            Contacts: <br />
                            +420987654321 <br />
                            garage.sale@gmail.com
                        </p>
                    </b>

                    <i className={ItemsListStyles['address-container']}>
                        <p className={ItemsListStyles['address']}>Address:<br />
                        nám. Svobody 72/8 <br />
                        602 00 Brno-střed <br />
                        Czech Republic</p>
                    </i>

                    <a href="https://www.instagram.com/">
                        <img
                            className={ItemsListStyles['instagram-icon']}
                            alt="Instagram"
                            src={InstagramIcon}
                        />
                    </a>

                    <a href="https://www.facebook.com/">
                        <img
                            className={ItemsListStyles['facebook-icon']}
                            alt="Facebook"
                            src={FacebookIcon}
                        />
                    </a>

                    <a href="https://twitter.com/">
                        <img
                            className={ItemsListStyles['twitter-icon']}
                            alt="Twitter"
                            src={TwitterIcon}
                        />
                    </a>

                </div>

            </div>
        </div>
    );
}

export default ItemsList;