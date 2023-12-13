import React, {useEffect, useRef, useState } from "react";
import { } from "react-router-dom";
import { fixElementHeight, AddContact} from "../Utils";
import AddItemPageStyles from "./AddItemPage.module.css";
import "../GlobalStyles.css";

const AddItemPage = () => {

    const headerRef = useRef(null);
    // const logInRef = useRef(null);
    // const loggedIn = useRef(null);
    // const navigate = useNavigate();

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        // checkLogin(loggedIn, logInRef).then((result) => {
        //     if (!result) {
        //         navigate('/login');
        //     }
        // }
        // );
    }
    , []);

    return (
        <div>

            {/* {AddHeader(headerRef, logInRef, loggedIn)} */}

            <div className="add-item-container">
                <label for = "image" className="add-item-image-label">Image:</label>
                <input type="file"  accept = "image/*" className={AddItemPageStyles['add-item-image-input']} />
            </div>

            {AddContact()}
        </div>
    );
}

export default AddItemPage;