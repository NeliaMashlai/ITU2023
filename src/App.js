import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomePage from './components/HomePage/HomePage';
// import UserPage from './components/UserPage/UserPage';
import MenCategoryPage from './components/Categories/MenCategories';
import MenItemsList from './components/ItemsLists/MenItemsList';
import AddItemPage from './components/AddItem/AddItemPage';
import EditItemPage from './components/EditItem/EditItemPage';
import './components/GlobalStyles.css';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/user" element={<UserPage />} /> */}
        <Route path="/men" element={<MenCategoryPage />} />
        {/* <Route path="/women" element={<WomenCategoryPage />} /> */}
        {/* <Route path="/kids" element={<KidsCategoryPage />} /> */}
        <Route path="/men/items" element={<MenItemsList />} /> 
        <Route path="/user/add-item" element={<AddItemPage />} />
        <Route path="/user/edit-item" element={<EditItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

