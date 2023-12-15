import React, { useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Contacts, checkLogin, fixElementHeight } from '../Utils';
import MenItemsListStyles from './MenItemsList.module.css';
import InstagramIcon from '../images/instagram_icon.png';
import FacebookIcon from '../images/facebook_icon.png';
import TwitterIcon from '../images/twitter_icon.png';
import '../GlobalStyles.css';

// import { API_BASE_URL, fixElementHeight } from '../Utils';

const MenItemsList = () => {

    const headerRef = useRef(null);
    const logInRef = useRef(null);
    const loggedIn = useRef(null);
    
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const categoryId = queryParams.get('categoryId');

    console.log(categoryId);

    useEffect(() => {
        if (headerRef.current) {
            fixElementHeight(headerRef.current);
        }
    
        checkLogin(loggedIn, logInRef);
    }
    , []);

    return (
        <div>

            <Header headerRef={headerRef} logInRef={logInRef} loggedIn={loggedIn} />

            <div className={MenItemsListStyles['main-container']}>

                <div className={MenItemsListStyles['caption']}>Men : Clothing</div>

                <div className={MenItemsListStyles['items-container']}>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTdmpHiribwaKdIx1pNzNd99VNPOuG5ZMFw7bSEaUYzbL0m9S9I" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                    <div className={MenItemsListStyles['item-container']}>
                        <img src="https://images.pexels.com/photos/7691068/pexels-photo-7691068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Clothing" className={MenItemsListStyles['item-image']} />
                        <div className={MenItemsListStyles['item-name']}>Clothing</div>
                        <div className={MenItemsListStyles['item-price']}>$ 100</div>
                    </div>

                </div>

            </div>
            
            <Contacts />

        </div>
    );
}

export default MenItemsList;