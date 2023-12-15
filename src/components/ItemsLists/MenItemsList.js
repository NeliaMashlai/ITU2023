import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Header, checkLogin, fixElementHeight, API_BASE_URL } from '../Utils';
import MenItemsListStyles from './MenItemsList.module.css';
import InstagramIcon from '../images/instagram_icon.png';
import FacebookIcon from '../images/facebook_icon.png';
import TwitterIcon from '../images/twitter_icon.png';
import '../GlobalStyles.css';

const MenItemsList = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    
    const itemsContainerRef = useRef(null);

    const [items, setItems] = useState([]);

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const categoryId = queryParams.get('categoryId');

    const addItem = (item_id, image_path, name, price) => {
        var link = "/item?item_id=" + item_id;
        return (
            <Link key = {item_id} to = {link} className={MenItemsListStyles['item-container']}>
                <img src={image_path} alt="Clothing" className={MenItemsListStyles['item-image']} />
                <div className={MenItemsListStyles['item-name']}>{name}</div>
                <div className={MenItemsListStyles['item-price']}>{price}</div>
            </Link>
        );
    }

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        checkLogin(loggedIn, logInRef);

        const fetchItems = async () => {
            const response = await fetch(API_BASE_URL + "/items", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            setItems(data);
        }

        fetchItems();
    }
    , []);

    return (
        <div>

            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />

            <div className={MenItemsListStyles['main-container']}>

                <div className={MenItemsListStyles['caption']}>Men : Clothing</div>

                <div className={MenItemsListStyles['items-container']} ref = {itemsContainerRef}>

                    {items.map(item => addItem(item.id, item.image_path, item.name, item.price))}

                </div>

                <div className={MenItemsListStyles['contacts']}>
                    <b className={MenItemsListStyles['contacts-container']}>
                        <p className={MenItemsListStyles['contacts-text']}>
                            Contacts: <br />
                            +420987654321 <br />
                            garage.sale@gmail.com
                        </p>
                    </b>

                    <i className={MenItemsListStyles['address-container']}>
                        <p className={MenItemsListStyles['address']}>Address:<br />
                        nám. Svobody 72/8 <br />
                        602 00 Brno-střed <br />
                        Czech Republic</p>
                    </i>

                    <a href="https://www.instagram.com/">
                        <img
                            className={MenItemsListStyles['instagram-icon']}
                            alt="Instagram"
                            src={InstagramIcon}
                        />
                    </a>

                    <a href="https://www.facebook.com/">
                        <img
                            className={MenItemsListStyles['facebook-icon']}
                            alt="Facebook"
                            src={FacebookIcon}
                        />
                    </a>

                    <a href="https://twitter.com/">
                        <img
                            className={MenItemsListStyles['twitter-icon']}
                            alt="Twitter"
                            src={TwitterIcon}
                        />
                    </a>

                </div>

            </div>
        </div>
    );
}

export default MenItemsList;