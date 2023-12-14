import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import UserPage from './components/UserPage/UserPage';
import KidsCategoriesPage from './components/Categories/KidsCategories';
import MenCategoriesPage from './components/Categories/MenCategories';
import WomenCategoriesPage from './components/Categories/WomenCategories';
import ItemPage from './components/ItemPage/ItemPage';
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
        <Route path="/profile" element={<UserPage />} />
        <Route path="/men" element={<MenCategoriesPage />} />
        <Route path="/women" element={<WomenCategoriesPage />} /> 
        <Route path="/kids" element={<KidsCategoriesPage />} />
        <Route path="/men/items" element={<MenItemsList />} /> 
        <Route path="/user/add-item" element={<AddItemPage />} />
        <Route path="/user/edit-item" element={<EditItemPage />} />
        <Route path="/item" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

