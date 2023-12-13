import React, { } from 'react';
import { useLocation } from 'react-router-dom';

// import { API_BASE_URL, fixElementHeight } from '../Utils';

const MenItemsList = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const categoryId = queryParams.get('categoryId');

    console.log(categoryId);

    return (
        <div>Test</div>
    );
}

export default MenItemsList;