import React, {useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import WomenCategoriesStyle from "./WomenCategories.module.css";
import { fixElementHeight, checkLogin, Contacts, Header } from "../Utils";
import "../GlobalStyles.css";

const WomenCategoriesPage = () => {

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
            
            <div className={WomenCategoriesStyle['main-container']}>
                <div className={WomenCategoriesStyle['categories']}>Categories</div>

                <div className="categories-container">
                    <Link className="category-item" to = "/items?categoryId=womenClothing">
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing"/>
                        <div className="centered-text" style = {{color: "var(--green)"}}>Clothing</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=womenShoes">
                        <img src="https://images.pexels.com/photos/7691393/pexels-photo-7691393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Shoes"/>
                        <div className="centered-text" style = {{color: "var(--green)"}}>Shoes</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=womenAccessories">
                        <img src="https://images.pexels.com/photos/1751150/pexels-photo-1751150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Accessories"/>
                        <div className="centered-text" style = {{color: "var(--green)"}}>Accessories</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=womenBags">
                        <img src="https://images.pexels.com/photos/7262777/pexels-photo-7262777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Bags and luggage"/>
                        <div className="centered-text" style = {{color: "var(--green)"}}>Bags and Luggage</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=womenJewelry">
                        <img src="https://images.pexels.com/photos/1467188/pexels-photo-1467188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Jewelry and watches"/>
                        <div className="centered-text" style = {{color: "var(--titanium)"}}>Jewelry and watches</div>
                    </Link>
                    <Link className="category-item" to = "/items?categoryId=womenVintage">
                        <img src="https://images.pexels.com/photos/326316/pexels-photo-326316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Vintage and collectibles"/>
                        <div className="centered-text" style = {{color: "var(--green)"}}>Vintage and Collectibles</div>
                    </Link>
                </div>
            </div>

            <Contacts />
        </div>
    );
}

export default WomenCategoriesPage;