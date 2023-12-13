import React, {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fixElementHeight, AddContact, checkLogin, AddHeader, CreateItem} from "../Utils";
import img_svg from "../images/photo_img.svg";
import EditItemPageStyles from "./EditItemPage.module.css";
import "../GlobalStyles.css";

const EditItemPage = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    const uploadContainerRef = useRef(null);
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const [ItemData, setItemData] = useState({
        name: "",
        description: "",
        price: "",
    });

    const handleInputChange = (e) => {
        setItemData({
            ...ItemData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFiles = (file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            uploadContainerRef.current.style.background = 'none';
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFiles(file);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        handleFiles(file);
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const EditItem = async (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        checkLogin(loggedIn, logInRef).then((result) => {
            if (!result) {
                navigate('/login');
            }
        }
        );
    }
    , []);

    return (
        <div>

            {AddHeader(headerRef, logInRef, loggedIn)}

            <div className={EditItemPageStyles["main-container"]} >
            <div onDragOver={handleDragOver} onDrop={handleDrop} 
                onClick={handleClick} className={EditItemPageStyles['image-upload-container']} 
                ref = {uploadContainerRef}>

                    {selectedFile ? (

                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className={EditItemPageStyles["image-preview"]}/>

                    ) : (
                        <>

                            <img src={img_svg} alt="Upload" className={EditItemPageStyles["image-upload-icon"]} />

                        </>
                    )}

                    <input
                        type="file"
                        onChange={handleChange}
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />

                </div>

                <div className={EditItemPageStyles["price-input-container"]}>
                    <label htmlFor="price" className={EditItemPageStyles["price-label"]}
                    value = {ItemData.price} onChange={handleInputChange}>Price:</label>
                    <input type="text" name="price" className={EditItemPageStyles["price-input"]} id="price" 
                    placeholder="Set new item price" value = {ItemData.price} onChange = {handleInputChange}/>
                </div>

                <div className={EditItemPageStyles["name-input-container"]}>
                    <label htmlFor="name" className={EditItemPageStyles["name-label"]}>Name:</label>
                    <input type="text" name="name" className={EditItemPageStyles["name-input"]} id="name" 
                    placeholder="Add new item naming here..." value = {ItemData.name} onChange = {handleInputChange}/>
                </div>

                <div className={EditItemPageStyles["size-input-container"]}>
                    <label htmlFor="size" className={EditItemPageStyles["size-label"]}>Size:</label>
                    <input type="text" name="size" className={EditItemPageStyles["size-input"]} id="size" 
                    placeholder="Add new item size here..."/>
                </div>

                <div className={EditItemPageStyles["condition-input-container"]}>
                    <label htmlFor="condition" className={EditItemPageStyles["condition-label"]}>Condition:</label>
                    <select name="New condition" className={EditItemPageStyles["condition-input"]} id="condition" defaultValue="-none-">
                        <option value="-none-">--none--</option>
                        <option value="new">Brand new</option>
                        <option value="likeNew">Like new</option>
                        <option value="gentlyUsed">Gently used</option>
                        <option value="used">Used</option>
                        <option value="vinatge">Vintage or retro</option>
                        <option value="forParts">For parts or repair</option>
                    </select>
                </div>

                <div className={EditItemPageStyles["category-input-container"]}>
                    <label htmlFor="category" className={EditItemPageStyles["category-label"]}>Category:</label>
                    <select name="New category" className={EditItemPageStyles["category-input"]} id="category" defaultValue="-none-">
                        <option value="-none-">--none--</option>
                        <optgroup label="Men">
                            <option value="menClothing">Clothing</option>
                            <option value="menShoes">Shoes</option>
                            <option value="menAccessories">Accessories</option>
                            <option value="menBags">Bags and Luggage</option>
                            <option value="menJewelry">Jewelry and watches</option>
                            <option value="menVintage">Vintage and collectibles</option>
                        </optgroup>
                        <optgroup label="Women">
                            <option value="womenClothing">Clothing</option>
                            <option value="womenShoes">Shoes</option>
                            <option value="womenAccessories">Accessories</option>
                            <option value="womenBags">Bags and Luggage</option>
                            <option value="womenJewelry">Jewelry and watches</option>
                            <option value="womenVintage">Vintage and collectibles</option>
                        </optgroup>
                        <optgroup label="Kids">
                            <option value="kidsClothing">Clothing</option>
                            <option value="kidsShoes">Shoes</option>
                            <option value="kidsAccessories">Accessories</option>
                            <option value="kidsBags">Bags and Luggage</option>
                            <option value="kidsJewelry">Jewelry and watches</option>
                            <option value="kidsVintage">Vintage and collectibles</option>
                        </optgroup>
                    </select>
                </div>

                <div className={EditItemPageStyles["description-input-container"]}>
                    <label htmlFor="description" className={EditItemPageStyles["description-label"]}>Description:</label>
                    <textarea name="description" className={EditItemPageStyles["description-input"]} id="description" 
                    placeholder="Add new item description here..." value = {ItemData.description} onChange = {handleInputChange}/>
                </div>

                <input type="button" value="EDIT" className={EditItemPageStyles["edit-button1"]} onClick = {EditItem} />
                <input type="button" value="EDIT" className={EditItemPageStyles["edit-button2"]} onClick = {EditItem} />
                <input type="button" value="EDIT" className={EditItemPageStyles["edit-button3"]} onClick = {EditItem} />
                <input type="button" value="EDIT" className={EditItemPageStyles["edit-button4"]} onClick = {EditItem} />
                <input type="button" value="EDIT" className={EditItemPageStyles["edit-button5"]} onClick = {EditItem} />
                <input type="button" value="EDIT" className={EditItemPageStyles["edit-button6"]} onClick = {EditItem} />

                <input type="submit" value="DONE" className={EditItemPageStyles["submit-button"]} onClick = {EditItem} />

            </div>


            {AddContact()}
        </div>
    );
}

export default EditItemPage;   
