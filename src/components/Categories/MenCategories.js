import React, {useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MenCategoriesStyle from "./MenCategories.module.css";
import { fixElementHeight, checkLogin, Contacts, Header } from "../Utils";
import "../GlobalStyles.css";

const MenCategoriesPage = () => {

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
            
            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />
            
            <div className={MenCategoriesStyle['main-container']}>
                <div className={MenCategoriesStyle['categories']}>Categories</div>

                <div className="categories-container">
                    <Link className="category-item" to="/items?categoryId=menClothing">
                        <img src="https://images.pexels.com/photos/4210866/pexels-photo-4210866.jpeg" alt="Clothing"/>
                        <div className="centered-text" style = {{color: "#093825"}}>Clothing</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=menShoes">
                        <img src="https://donabees.co.uk/cdn/shop/products/mnz-v13tnV6D9lw-unsplash.jpg?v=1682244843&width=1946" alt="Shoes"/>
                        <div className="centered-text" style = {{color: "var(--titanium)"}}>Shoes</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=menAccessories">
                        <img src="https://netstorage-legit.akamaized.net/images/afee74afb4d8ea20.jpg" alt="Accessories"/>
                        <div className="centered-text" style = {{color: "var(--titanium)"}}>Accessories</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=menBags">
                        <img src="https://newtraveltrait.com/wp-content/uploads/2023/02/pexels-ketut-subiyanto-4246101-1-683x1024.jpg" alt="Bags and luggage"/>
                        <div className="centered-text" style = {{color: "var(--titanium)"}}>Bags and Luggage</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=menJewelry">
                        <img src="https://images.pexels.com/photos/2155319/pexels-photo-2155319.jpeg" alt="Jewelry and watches"/>
                        <div className="centered-text" style = {{color: "var(--titanium)"}}>Jewelry and watches</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=menVintage">
                        <img src="https://okrok.cz/wp-content/uploads/2021/12/typewriter-g7715445ec_1280.jpg" alt="Vintage and collectibles"/>
                        <div className="centered-text" >
                            <span style={{color: "var(--blue)"}}>Vintage</span>
                            <span style={{color: "var(--titanium)"}}> and collectibles</span>
                        </div>
                    </Link>
                </div>
            </div>

            <Contacts />
        </div>
    );
}

export default MenCategoriesPage;