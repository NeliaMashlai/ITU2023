import React, {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fixElementHeight, Contacts, checkLogin, Header, uploadImage, GetUserInformation, API_BASE_URL } from "../Utils";
import img_svg from "../images/photo_img.svg";
import AddItemPageStyles from "./AddItemPage.module.css";
import "../GlobalStyles.css";

const AddItemPage = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    const uploadContainerRef = useRef(null);
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const [ItemData, setItemData] = useState({
        name: "",
        description: "",
        price: "",
        size: "",
        conditionId: "",
        categoryId: "",
        image_path: "",
        author_id: "",
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
        } else {
            setError('Invalid file type');
            setSelectedFile(null);
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

    const CreateItem = async (e) => {
        e.preventDefault();

        if (!selectedFile || !ItemData.name || !ItemData.price || !ItemData.conditionId || !ItemData.categoryId) {
            setError('Please fill all fields');
            return;
        }

        if(ItemData.conditionId === "-none-" || ItemData.categoryId === "-none-") {
            setError('Please fill all fields');
            return;
        }

        const response = await GetUserInformation();

        if (!response) {
            setError('Failed to get user information');
            return;
        }

        const responseUrl = await uploadImage(selectedFile);

        if (!responseUrl) {
            setError('Failed to upload image');
            return;
        }

        if (!parseFloat(ItemData.price)) {
            setError('Invalid price');
            return;
        }

        const data = {
            name: ItemData.name,
            description: ItemData.description,
            price: parseFloat(ItemData.price),
            size: ItemData.size,
            conditionId: ItemData.conditionId,
            categoryId: ItemData.categoryId,
            image_path: responseUrl.url,
            author_id: parseInt(response.id),
        };

        try {
            const response = await fetch(API_BASE_URL + "/item/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate('/profile');
            } else if (response.status === 500) {
                setError("Server error");
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            setError("Failed to connect to the server");
        }
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
    , [navigate]);

    return (
        <div>

            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />

            <div className={AddItemPageStyles["main-container"]} >

                <div onDragOver={handleDragOver} onDrop={handleDrop} 
                onClick={handleClick} className={AddItemPageStyles['image-upload-container']} 
                ref = {uploadContainerRef}>

                    {selectedFile ? (

                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className={AddItemPageStyles["image-preview"]}/>

                    ) : (
                        <>

                            <img src={img_svg} alt="Upload" className={AddItemPageStyles["image-upload-icon"]} />

                        </>
                    )}

                    <input
                        type="file"
                        onChange={handleChange}
                        accept=".jpg,.jpeg,.png"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />

                </div>

                <div className={AddItemPageStyles["price-input-container"]}>
                    <label htmlFor="price" className={AddItemPageStyles["price-label"]}
                    value = {ItemData.price} onChange={handleInputChange}>Price:</label>
                    <input type="text" name="price" className={AddItemPageStyles["price-input"]} id="price" 
                    placeholder="set item price" value = {ItemData.price} onChange = {handleInputChange}/>
                </div>

                <div className={AddItemPageStyles["name-input-container"]}>
                    <label htmlFor="name" className={AddItemPageStyles["name-label"]}>Name:</label>
                    <input type="text" name="name" className={AddItemPageStyles["name-input"]} id="name" 
                    placeholder="Add item naming here..." value = {ItemData.name} onChange = {handleInputChange}/>
                </div>

                <div className={AddItemPageStyles["size-input-container"]}>
                    <label htmlFor="size" className={AddItemPageStyles["size-label"]}>Size:</label>
                    <input type="text" name="size" className={AddItemPageStyles["size-input"]} id="size" 
                    placeholder="Add item size here..." value = {ItemData.size} onChange = {handleInputChange}/>
                </div>

                <div className={AddItemPageStyles["condition-input-container"]}>
                    <label htmlFor="condition" className={AddItemPageStyles["condition-label"]}>Condition:</label>
                    <select name="conditionId" className={AddItemPageStyles["condition-input"]} id="condition" defaultValue="-none-" 
                    onChange={handleInputChange}>
                        <option value="-none-">--none--</option>
                        <option value="new">Brand new</option>
                        <option value="likeNew">Like new</option>
                        <option value="gentlyUsed">Gently used</option>
                        <option value="used">Used</option>
                        <option value="vintage">Vintage or retro</option>
                        <option value="forParts">For parts or repair</option>
                    </select>
                </div>

                <div className={AddItemPageStyles["category-input-container"]}>
                    <label htmlFor="category" className={AddItemPageStyles["category-label"]}>Category:</label>
                    <select name="categoryId" className={AddItemPageStyles["category-input"]} id="category" defaultValue="-none-"
                    onChange={handleInputChange}>
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
                            <option value="kidsToys">Toys</option>
                            <option value="kidsEducational">Educational and craft supplies</option>
                        </optgroup>
                    </select>
                </div>

                <div className={AddItemPageStyles["description-input-container"]}>
                    <label htmlFor="description" className={AddItemPageStyles["description-label"]}>Description:</label>
                    <textarea name="description" className={AddItemPageStyles["description-input"]} id="description" 
                    placeholder="Add item description here..." value = {ItemData.description} onChange = {handleInputChange}/>
                </div>

                <input type="submit" value="DONE" className={AddItemPageStyles["submit-button"]} onClick = {CreateItem} />

                {error && <div className={AddItemPageStyles['error']}>{error}</div>}

            </div>

            <Contacts />
            
        </div>
    );
}

export default AddItemPage;