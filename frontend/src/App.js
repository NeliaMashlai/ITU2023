/*
 * Project: ITU project - Garage sale website
 * @file App.js

 * @brief root ReactJS component of the website(routing)

 * @author Neonila Mashlai - xmashl00
*/

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
import ItemsList from './components/ItemsList/ItemsList';
import AddItemPage from './components/AddItem/AddItemPage';
import EditItemPage from './components/EditItem/EditItemPage';
import ChatsPage from './components/Chats/ChatsPage'
import Page404 from './components/ErrorPages/Page404';
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
        <Route path="/items" element={<ItemsList />} /> 
        <Route path="/user/add-item" element={<AddItemPage />} />
        <Route path="/user/edit-item" element={<EditItemPage />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="/user/chats" element={<ChatsPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

