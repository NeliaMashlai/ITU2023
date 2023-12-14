import React, {useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import KidsCategoriesStyle from "./KidsCategories.module.css";
import { fixElementHeight, checkLogin, Contacts, Header } from "../Utils";
import "../GlobalStyles.css";

const KidsCategoriesPage = () => {

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
            
            <div className={KidsCategoriesStyle['main-container']}>
                <div className={KidsCategoriesStyle['categories']}>Categories</div>

                <div className="categories-container">
                    <Link className="category-item" to="/kids/items?categoryId=1">
                        <img src="https://images.pexels.com/photos/13768126/pexels-photo-13768126.jpeg" alt="Clothing"/>
                        <div className="centered-text" style = {{color: "var(--white)"}}>Clothing</div>
                    </Link>
                    <div className="category-item">
                        <img src="https://images.pexels.com/photos/15668369/pexels-photo-15668369/free-photo-of-children-shoes-on-ground.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Shoes"/>
                        <div className="centered-text" style = {{color: "var(--white)"}}>Shoes</div>
                    </div>
                    <div className="category-item">
                        <img src="https://images.pexels.com/photos/5526415/pexels-photo-5526415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Accessories"/>
                        <div className="centered-text" style = {{color: "var(--white)"}}>Accessories</div>
                    </div>
                    <div className="category-item">
                        <img src="https://images.pexels.com/photos/7169717/pexels-photo-7169717.jpeg" alt="Bags and luggage"/>
                        <div className="centered-text" style = {{color: "var(--white)"}}>Bags and Luggage</div>
                    </div>
                    <div className="category-item">
                        <img src="https://images.pexels.com/photos/1705287/pexels-photo-1705287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Toys"/>
                        <div className="centered-text" style = {{color: "var(--white)"}}>Toys</div>
                    </div>
                    <div className="category-item">
                        <img src="https://images.pexels.com/photos/244028/pexels-photo-244028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Educational and craft supplies"/>
                        <div className="centered-text" style = {{color: "var(--white)"}}>Educational and Craft Supplies</div>
                    </div>
                </div>
            </div>

            <Contacts />
        </div>
    );
}

export default KidsCategoriesPage;